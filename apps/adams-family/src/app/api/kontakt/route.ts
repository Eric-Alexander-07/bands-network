import { NextRequest, NextResponse } from "next/server";
import { band } from "@/config/band";
import {
  checkEmailRate,
  checkFieldLengths,
  checkOrigin,
  checkRequestRate,
  readJsonBody,
  type GuardResult,
} from "@bands/form-guard";
import { getResend, CONTACT_FROM_EMAIL } from "@/lib/mail/resend";
import { notificationEmailHtml, confirmationEmailHtml, type InquiryDetails } from "@/lib/mail/templates";

/**
 * Nimmt Buchungs- (/booking) und Kontaktformular (/kontakt) entgegen.
 *
 * Sendet zwei Mails ueber Resend: eine interne Benachrichtigung an
 * info@v-m-p.com (Reply-To = Absender, damit direkt geantwortet werden kann)
 * und eine Bestaetigung an den Absender (Reply-To = info@v-m-p.com).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(payload: Record<string, unknown>, key: string): string | undefined {
  const value = payload[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

/** Ablehnung des Schutzes als JSON-Antwort (bei 429 mit Retry-After). */
function reject(r: Extract<GuardResult, { ok: false }>) {
  return NextResponse.json(
    { ok: false, error: r.error },
    { status: r.status, headers: r.retryAfter ? { "Retry-After": String(r.retryAfter) } : undefined }
  );
}

export async function POST(request: NextRequest) {
  // Schutz (Herkunft, Rate-Limit, Groessen): siehe @bands/form-guard und docs/KONTAKTFORMULARE.md
  const origin = checkOrigin(request);
  if (!origin.ok) return reject(origin);
  const rate = checkRequestRate(request);
  if (!rate.ok) return reject(rate);
  const body = await readJsonBody(request);
  if (!body.ok) return reject(body);
  const payload = body.payload;
  const lengths = checkFieldLengths(payload);
  if (!lengths.ok) return reject(lengths);

  // Honeypot: Bots fuellen verstecktes Feld aus, echte Nutzer nie.
  if (field(payload, "website")) {
    return NextResponse.json({ ok: true });
  }

  const formType = payload.formType === "kontakt" ? "kontakt" : "booking";
  const name = field(payload, "name");
  const email = field(payload, "email");
  const message = field(payload, "message");

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte Name, eine gültige E-Mail-Adresse und eine Nachricht angeben." },
      { status: 400 }
    );
  }

  const emailRate = checkEmailRate(email);
  if (!emailRate.ok) return reject(emailRate);

  const details: InquiryDetails = {
    formType,
    name,
    email,
    phone: field(payload, "phone"),
    date: field(payload, "date"),
    occasion: field(payload, "occasion"),
    subject: field(payload, "subject"),
    message,
  };

  const typeLabel = formType === "booking" ? "Buchungsanfrage" : "Kontaktanfrage";

  // Resend wirft bei API-Fehlern (falscher Key, nicht verifizierte Domain, ...)
  // NICHT — es liefert { data: null, error: {...} } zurueck. Muss explizit geprueft werden.
  try {
    const { error } = await getResend().emails.send({
      from: CONTACT_FROM_EMAIL,
      to: band.email,
      replyTo: email,
      subject: `[The Adams Family] ${typeLabel}${details.occasion ? ` – ${details.occasion}` : ""}`,
      html: notificationEmailHtml(details),
    });
    if (error) throw error;
  } catch (error) {
    console.error("Resend: interne Benachrichtigung fehlgeschlagen:", error);
    return NextResponse.json(
      {
        ok: false,
        error: `Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt an ${band.email}.`,
      },
      { status: 502 }
    );
  }

  // Schlaegt nur die Bestaetigungsmail fehl, ist die Anfrage trotzdem beim
  // Team angekommen — das zaehlt als Erfolg fuer den Nutzer.
  try {
    const { error } = await getResend().emails.send({
      from: CONTACT_FROM_EMAIL,
      to: email,
      replyTo: band.email,
      subject: "Ihre Anfrage bei The Adams Family ist eingegangen",
      html: confirmationEmailHtml(details),
    });
    if (error) throw error;
  } catch (error) {
    console.error("Resend: Bestätigungsmail fehlgeschlagen:", error);
  }

  return NextResponse.json({ ok: true });
}
