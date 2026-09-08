import { band } from "@/config/band";

/**
 * HTML-Mailvorlagen im Bobby-&-Friends-Unplugged-Theme ("Kerzenschein").
 *
 * Tabellenlayout + Inline-Styles statt <style>-Block, weil Outlook Desktop
 * <style> unzuverlaessig rendert.
 */

const COLORS = {
  bg: "#1A1410",
  surface: "#241D17",
  gold: "#C98A4B",
  goldDim: "#A66F39",
  text: "#F3EAE0",
  textDim: "#C7B9AC",
  textMuted: "#8F8071",
  border: "rgba(201,138,75,0.28)",
  hairline: "rgba(255,255,255,0.07)",
};

// Mailprogramme laden keine Webfonts, Fraunces ist hier also nicht
// verfuegbar. Naechste Entsprechung zur Ueberschriftenschrift: eine
// klassische Serif statt der handgeschriebenen Wirkung im Web.
const FONT_DISPLAY = "Georgia, 'Times New Roman', serif";
const FONT_BODY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

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

/** ISO-Datum aus <input type="date"> für deutsche Leser aufbereiten. */
function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : value;
}

function detailRow(label: string, value?: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:7px 0; font-family:${FONT_BODY}; font-size:12px; color:${COLORS.textMuted}; text-transform:uppercase; letter-spacing:0.5px; width:110px; vertical-align:top; white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:7px 0; font-family:${FONT_BODY}; font-size:14px; color:${COLORS.text}; vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function messageBlock(message: string): string {
  const html = escapeHtml(message).replace(/\n/g, "<br />");
  return `<div style="margin-top:18px; padding:16px 18px; background:${COLORS.bg}; border:1px solid ${COLORS.hairline}; border-radius:4px; font-family:${FONT_BODY}; font-size:14px; line-height:1.7; color:${COLORS.text};">${html}</div>`;
}

function emailShell(opts: { preheader: string; heading: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bobby & Friends Unplugged</title>
  </head>
  <body style="margin:0; padding:0; background:${COLORS.bg};">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:${COLORS.surface}; border:1px solid ${COLORS.border}; border-radius:4px;">
            <tr>
              <td style="padding:36px 40px 20px; text-align:center;">
                <div style="font-family:${FONT_BODY}; font-size:13px; letter-spacing:4px; text-transform:uppercase; color:${COLORS.gold}; font-weight:600;">Bobby &amp; Friends Unplugged</div>
                <div style="height:1px; width:48px; background:${COLORS.goldDim}; margin:16px auto 0; font-size:0; line-height:0;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <h1 style="font-family:${FONT_DISPLAY}; font-weight:600; font-size:22px; letter-spacing:0.02em; line-height:1.35; color:${COLORS.text}; margin:0 0 20px;">${opts.heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;">${opts.bodyHtml}</td>
            </tr>
            <tr>
              <td style="padding:22px 40px 32px; border-top:1px solid ${COLORS.hairline};">
                <p style="margin:0; font-family:${FONT_BODY}; font-size:12px; color:${COLORS.textMuted}; line-height:1.7;">
                  Bobby &amp; Friends Unplugged — Akustikmusik für Wohnzimmerkonzerte & Dinner<br />
                  ${escapeHtml(band.email)} · ${escapeHtml(band.phone)}<br />
                  <a href="${band.socials.instagram}" style="color:${COLORS.gold}; text-decoration:none;">Instagram</a>
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
    detailRow("Datum", formatDate(d.date)),
    detailRow("Anlass", d.occasion),
    detailRow("Betreff", d.subject),
    detailRow("Formular", d.formType === "booking" ? "bobbyandfriends-unplugged.de/booking" : "bobbyandfriends-unplugged.de/kontakt"),
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
      ? "vielen Dank für Ihre Buchungsanfrage bei Bobby & Friends Unplugged. Wir haben Ihre Angaben erhalten und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen."
      : "vielen Dank für Ihre Nachricht an Bobby & Friends Unplugged. Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.";

  const rows = [
    detailRow("Name", d.name),
    detailRow("E-Mail", d.email),
    detailRow("Telefon", d.phone),
    detailRow("Datum", formatDate(d.date)),
    detailRow("Anlass", d.occasion),
    detailRow("Betreff", d.subject),
  ].join("");

  const body = `
    <p style="margin:0 0 24px; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Guten Tag ${escapeHtml(d.name)},<br /><br />${intro}
    </p>
    <p style="margin:0 0 8px; font-family:${FONT_BODY}; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:${COLORS.gold};">Ihre Angaben</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBlock(d.message)}
    <p style="margin:24px 0 0; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.textDim};">
      Musikalische Grüße<br />Ihr Bobby & Friends Unplugged Team
    </p>
  `;

  return emailShell({
    preheader: "Ihre Anfrage bei Bobby & Friends Unplugged ist eingegangen.",
    heading:
      d.formType === "booking"
        ? "Ihre Buchungsanfrage ist eingegangen"
        : "Ihre Nachricht ist eingegangen",
    bodyHtml: body,
  });
}
