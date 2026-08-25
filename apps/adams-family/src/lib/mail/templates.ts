import { band } from "@/config/band";

/**
 * HTML-Mailvorlagen im Adams-Family-Theme („Beton").
 *
 * Dieselbe Palette wie die Website: Betongrau als Flaeche, Stahlblau als
 * einzige Akzentfarbe, keine Rundungen. Bewusst ohne Bilder — Bild-Blocker
 * in Mailprogrammen wuerden die Vorlage sonst kaputt aussehen lassen.
 * Tabellenlayout + Inline-Styles statt <style>-Block, weil Outlook Desktop
 * <style> unzuverlaessig rendert.
 */

const COLORS = {
  bg: "#0B0B0C",
  surface: "#17181A",
  accent: "#8FA3B8",
  accentDim: "#6E8095",
  text: "#E8E9EB",
  textDim: "#A8AEB6",
  textMuted: "#7C838C",
  border: "#2C2E32",
  hairline: "rgba(255,255,255,0.06)",
};

const FONT_DISPLAY =
  "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_BODY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_MONO = "'Courier New', Courier, monospace";

export interface InquiryDetails {
  formType: "booking" | "kontakt";
  name: string;
  email: string;
  phone?: string;
  date?: string;
  occasion?: string;
  subject?: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRow(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:7px 0; font-family:${FONT_MONO}; font-size:12px; color:${COLORS.textMuted}; text-transform:uppercase; letter-spacing:1px; width:110px; vertical-align:top; white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:7px 0; font-family:${FONT_BODY}; font-size:14px; color:${COLORS.text}; vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function messageBlock(message: string): string {
  const html = escapeHtml(message).replace(/\n/g, "<br />");
  return `<div style="margin-top:18px; padding:16px 18px; background:${COLORS.bg}; border:1px solid ${COLORS.border}; font-family:${FONT_BODY}; font-size:14px; line-height:1.7; color:${COLORS.text};">${html}</div>`;
}

function emailShell(opts: { preheader: string; heading: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>The Adams Family</title>
  </head>
  <body style="margin:0; padding:0; background:${COLORS.bg};">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:${COLORS.surface}; border:1px solid ${COLORS.border};">
            <tr>
              <td style="padding:36px 40px 20px; text-align:center;">
                <div style="font-family:${FONT_MONO}; font-size:12px; letter-spacing:4px; text-transform:uppercase; color:${COLORS.accent};">The Adams Family</div>
                <div style="height:2px; width:48px; background:${COLORS.accentDim}; margin:16px auto 0; font-size:0; line-height:0;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <h1 style="font-family:${FONT_DISPLAY}; font-weight:800; font-size:24px; line-height:1.15; letter-spacing:-0.5px; color:${COLORS.text}; margin:0 0 20px;">${opts.heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;">${opts.bodyHtml}</td>
            </tr>
            <tr>
              <td style="padding:22px 40px 32px; border-top:1px solid ${COLORS.hairline};">
                <p style="margin:0; font-family:${FONT_BODY}; font-size:12px; color:${COLORS.textMuted}; line-height:1.7;">
                  The Adams Family — ${escapeHtml(band.claim)}<br />
                  ${escapeHtml(band.email)} · ${escapeHtml(band.phone)}<br />
                  <a href="${band.socials.instagram}" style="color:${COLORS.accent}; text-decoration:none;">Instagram</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Interne Benachrichtigung an das Booking-Team (info@v-m-p.com). */
export function notificationEmailHtml(d: InquiryDetails): string {
  const typeLabel = d.formType === "booking" ? "Buchungsanfrage" : "Kontaktanfrage";
  const rows = [
    detailRow("Name", d.name),
    detailRow("E-Mail", d.email),
    detailRow("Telefon", d.phone),
    detailRow("Datum", d.date),
    detailRow("Anlass", d.occasion),
    detailRow("Betreff", d.subject),
    detailRow("Formular", d.formType === "booking" ? "/booking" : "/kontakt"),
  ].join("");

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBlock(d.message)}
  `;

  return emailShell({
    preheader: `Neue ${typeLabel} von ${d.name}`,
    heading: `Neue ${typeLabel} über die Website`,
    bodyHtml: body,
  });
}

/** Bestaetigungsmail an den Absender der Anfrage. */
export function confirmationEmailHtml(d: InquiryDetails): string {
  const intro =
    d.formType === "booking"
      ? "vielen Dank für Ihre Buchungsanfrage bei The Adams Family. Wir haben Ihre Angaben erhalten und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen."
      : "vielen Dank für Ihre Nachricht an The Adams Family. Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.";

  const rows = [
    detailRow("Name", d.name),
    detailRow("E-Mail", d.email),
    detailRow("Telefon", d.phone),
    detailRow("Datum", d.date),
    detailRow("Anlass", d.occasion),
    detailRow("Betreff", d.subject),
  ].join("");

  const body = `
    <p style="margin:0 0 24px; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Guten Tag ${escapeHtml(d.name)},<br /><br />${intro}
    </p>
    <p style="margin:0 0 8px; font-family:${FONT_MONO}; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:${COLORS.accent};">Ihre Angaben</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBlock(d.message)}
    <p style="margin:24px 0 0; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Rockige Grüße<br />Ihr Team von The Adams Family
    </p>
  `;

  return emailShell({
    preheader: "Ihre Anfrage bei The Adams Family ist eingegangen.",
    heading:
      d.formType === "booking"
        ? "Ihre Buchungsanfrage ist eingegangen"
        : "Ihre Nachricht ist eingegangen",
    bodyHtml: body,
  });
}
