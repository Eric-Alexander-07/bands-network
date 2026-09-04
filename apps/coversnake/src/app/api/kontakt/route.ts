import { NextRequest, NextResponse } from "next/server";
import { band } from "@/config/band";
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

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

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
      subject: `[CoverSnake] ${typeLabel}${details.occasion ? ` – ${details.occasion}` : ""}`,
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
      subject: "Ihre Anfrage bei CoverSnake ist eingegangen",
      html: confirmationEmailHtml(details),
    });
    if (error) throw error;
  } catch (error) {
    console.error("Resend: Bestätigungsmail fehlgeschlagen:", error);
  }

  return NextResponse.json({ ok: true });
}
