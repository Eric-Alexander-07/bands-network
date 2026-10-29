/**
 * Schutz fuer die Kontakt-/Buchungsroute (`/api/kontakt`), gemeinsam fuer alle Bands.
 *
 * Bewusst ohne externe Dienste und ohne Schluessel. Der Zaehler liegt im
 * Arbeitsspeicher der Serverinstanz: auf Vercel teilen sich mehrere Instanzen
 * keinen Speicher, die Grenzen gelten also pro Instanz. Das bremst Skripte und
 * versehentliche Mehrfachklicks zuverlaessig, ersetzt aber kein Captcha.
 * Ausbaupfad (Supabase/Upstash als Speicher, Turnstile): docs/KONTAKTFORMULARE.md.
 */

export const LIMITS = {
  /** Maximale Groesse des Request-Bodys in Bytes. */
  bodyBytes: 20_000,
  /** Maximale Zeichenzahl je Feld. */
  fields: {
    name: 100,
    email: 254,
    phone: 40,
    date: 10,
    occasion: 100,
    subject: 150,
    message: 5_000,
  } as Record<string, number>,
  /** Anfragen je IP-Adresse (zaehlt auch ungueltige Versuche). */
  perIp: { max: 5, windowMs: 10 * 60_000 },
  /** Mails je Empfaengeradresse — verhindert, dass Fremde per Bestaetigungsmail zugespammt werden. */
  perEmail: { max: 3, windowMs: 60 * 60_000 },
  /** Notbremse fuer die ganze Instanz. */
  global: { max: 60, windowMs: 60 * 60_000 },
};

export type GuardResult =
  | { ok: true }
  | { ok: false; status: number; error: string; retryAfter?: number };

const hits = new Map<string, number[]>();
const MAX_KEYS = 5_000;

function prune(now: number) {
  if (hits.size <= MAX_KEYS) return;
  for (const [key, times] of hits) {
    if (times.every(t => now - t > 60 * 60_000)) hits.delete(key);
  }
  // Waechst die Map trotzdem weiter (verteilter Angriff), aelteste Eintraege verwerfen.
  if (hits.size > MAX_KEYS) {
    for (const key of [...hits.keys()].slice(0, hits.size - MAX_KEYS)) hits.delete(key);
  }
}

/** Gleitendes Fenster. Zaehlt den Aufruf mit, auch wenn das Limit erreicht ist. */
export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  prune(now);
  if (recent.length <= max) return { ok: true, retryAfter: 0 };
  return { ok: false, retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000) };
}

/**
 * Client-IP. Auf Vercel setzt die Plattform diese Header selbst und
 * ueberschreibt Werte des Aufrufers; ausserhalb von Vercel sind sie faelschbar.
 */
export function clientIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unbekannt"
  );
}

/** Anfrage muss von der eigenen Seite kommen (Origin bzw. Referer = Host). */
export function checkOrigin(request: Request): GuardResult {
  const host = request.headers.get("host");
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!host || !source) return { ok: false, status: 403, error: "Anfrage nicht zulässig." };
  try {
    if (new URL(source).host !== host) throw new Error("fremde Herkunft");
  } catch {
    return { ok: false, status: 403, error: "Anfrage nicht zulässig." };
  }
  return { ok: true };
}

/** Body mit Groessenlimit lesen und als JSON-Objekt parsen. */
export async function readJsonBody(
  request: Request
): Promise<{ ok: true; payload: Record<string, unknown> } | Extract<GuardResult, { ok: false }>> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > LIMITS.bodyBytes) return { ok: false, status: 413, error: "Anfrage zu groß." };
  const text = await request.text();
  if (text.length > LIMITS.bodyBytes) return { ok: false, status: 413, error: "Anfrage zu groß." };
  try {
    const payload = JSON.parse(text);
    if (payload === null || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    return { ok: true, payload };
  } catch {
    return { ok: false, status: 400, error: "Ungültige Anfrage." };
  }
}

/** Zu lange Felder ablehnen, statt sie still abzuschneiden. */
export function checkFieldLengths(payload: Record<string, unknown>): GuardResult {
  for (const [key, max] of Object.entries(LIMITS.fields)) {
    const value = payload[key];
    if (typeof value === "string" && value.length > max) {
      return { ok: false, status: 400, error: "Eine Eingabe ist zu lang. Bitte kürzen Sie Ihren Text." };
    }
  }
  return { ok: true };
}

const TOO_MANY = "Zu viele Anfragen. Bitte versuchen Sie es später erneut.";

/** Limit je IP und je Instanz; vor jeder Verarbeitung aufrufen. */
export function checkRequestRate(request: Request): GuardResult {
  const ip = rateLimit(`ip:${clientIp(request)}`, LIMITS.perIp);
  if (!ip.ok) return { ok: false, status: 429, error: TOO_MANY, retryAfter: ip.retryAfter };
  const all = rateLimit("global", LIMITS.global);
  if (!all.ok) return { ok: false, status: 429, error: TOO_MANY, retryAfter: all.retryAfter };
  return { ok: true };
}

/** Limit je Empfaengeradresse; nach der Validierung, vor dem Mailversand. */
export function checkEmailRate(email: string): GuardResult {
  const r = rateLimit(`mail:${email.toLowerCase()}`, LIMITS.perEmail);
  return r.ok ? { ok: true } : { ok: false, status: 429, error: TOO_MANY, retryAfter: r.retryAfter };
}
