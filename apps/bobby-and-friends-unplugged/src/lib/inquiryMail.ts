import { band } from "@/config/band";

/**
 * Buchungsanfrage per E-Mail — Bobby & Friends Unplugged.
 *
 * Bobby & Friends Unplugged siezt; der Ton ist foermlich, wie bei Groove
 * Control und The Adams Family. Der Rueckfall hier greift nur, solange die
 * Fragen nicht in der Datenbank gepflegt sind — im Normalfall stammen sie
 * aus `inquiry_questions` und werden im Admin bearbeitet.
 *
 * Die Rechtsseiten nutzen bewusst eigene Betreffzeilen und sind NICHT an
 * diese Vorlage angebunden.
 */

export const EVENT_QUESTIONS = [
  "In welcher Stadt findet Ihre Veranstaltung statt?",
  "In welcher Location feiern Sie?",
  "Wie viele Gäste werden in etwa erwartet?",
  "Gibt es dort Technik (PA, Mikrofon) oder soll die Musik komplett mitgebracht werden?",
  "Welche Besetzung wünschen Sie sich — Solo, Duo oder mehr?",
  "Wie lange soll in etwa gespielt werden?",
  "Treten noch andere Künstler an dem Abend auf?",
  "Wünschen Sie dezente Hintergrundmusik oder ein aktives Bühnenprogramm?",
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

/** Fertiger `mailto:`-Link mit vorausgefuelltem Betreff und Text. */
export const INQUIRY_MAIL_HREF = `mailto:${band.email}?subject=${encodeURIComponent(INQUIRY_MAIL_SUBJECT)}&body=${encodeURIComponent(INQUIRY_MAIL_BODY)}`;
