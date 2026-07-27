import { band } from "@/config/band";

/**
 * Shared booking-inquiry e-mail template.
 *
 * Every "direct e-mail" link on the site (Home / Programm & Besetzung /
 * Referenzen CTA, the booking page, ...) opens the mail program pre-filled
 * with this template — band name in the subject and the event questions from
 * the booking page, each with a line to answer on.
 *
 * Note: shop/merch links and the legal pages (Impressum/Datenschutz) use
 * their own subjects and are intentionally NOT wired to this template.
 */

// Fragen aus den "Hilfreichen Angaben" — jeweils mit Platz zum Antworten.
export const EVENT_QUESTIONS = [
  "In welcher Stadt findet Eure Veranstaltung statt?",
  "In welcher Location feiert Ihr?",
  "Wie viele Gäste / Zuschauer werden in etwa erwartet?",
  "Gibt es in Eurer Location Technik, oder soll die Band diese mitbringen?",
  "Gibt es eine Bühne? Wie groß ist sie?",
  "Nehmt Ihr Eintritt, und wenn ja wie hoch ist er in der Regel?",
  "Wie lange soll die Band in etwa spielen?",
  "Treten noch andere Künstler / Bands an dem Abend auf?",
];

export const QUESTION_TEMPLATE = EVENT_QUESTIONS.map(q => `${q}\n: `).join("\n\n");

export const INQUIRY_MAIL_SUBJECT = `Anfrage für ${band.name}`;

export const INQUIRY_MAIL_BODY = [
  `Hallo ${band.name}-Team,`,
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
