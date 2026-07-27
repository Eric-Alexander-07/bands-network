import { band } from "@/config/band";

/**
 * Booking-inquiry e-mail template — Spirit of Soul variant.
 *
 * Same mechanism as the other band sites, but Spirit of Soul keeps its own,
 * more formal/elegant wording ("Sie"). Every direct e-mail link on the site
 * (Home / Services / Referenzen / Partner CTA, the booking page, ...) opens the
 * mail program pre-filled with this template — band name in the subject and the
 * event questions, each with a line to answer on.
 *
 * Note: shop/merch links and the legal pages (Impressum/Datenschutz) use their
 * own subjects and are intentionally NOT wired to this template.
 */

// Fragen aus den "Hilfreichen Angaben" — jeweils mit Platz zum Antworten.
export const EVENT_QUESTIONS = [
  "In welcher Stadt findet Ihre Veranstaltung statt?",
  "In welcher Location feiern Sie?",
  "Wie viele Gäste werden in etwa erwartet?",
  "Gibt es dort Technik oder soll die Band diese mitbringen?",
  "Gibt es eine Bühne?",
  "Haben Sie einen Budgetrahmen oder welche Besetzung wünschen Sie?",
  "Wie lange soll die Band in etwa spielen?",
  "Treten noch andere Künstler an dem Abend auf?",
  "Wünschen Sie Pausenmusik oder einen DJ-Service der Band?",
];

export const QUESTION_TEMPLATE = EVENT_QUESTIONS.map(q => `${q}\n: `).join("\n\n");

export const INQUIRY_MAIL_SUBJECT = `Anfrage für ${band.name}`;

export const INQUIRY_MAIL_BODY = [
  `Guten Tag ${band.name}-Team,`,
  "",
  "ich interessiere mich für eine Buchung. Hier meine Angaben:",
  "",
  "Name: ",
  "Telefon: ",
  "Veranstaltungsdatum: ",
  "Anlass: ",
  "",
  QUESTION_TEMPLATE,
  "",
  "--",
  `Diese Anfrage betrifft die Band ${band.name}.`,
].join("\n");

/** Ready-to-use `mailto:` href with subject + body pre-filled. */
export const INQUIRY_MAIL_HREF = `mailto:${band.email}?subject=${encodeURIComponent(INQUIRY_MAIL_SUBJECT)}&body=${encodeURIComponent(INQUIRY_MAIL_BODY)}`;
