import { band } from "@/config/band";

/**
 * Buchungsanfrage per E-Mail — Groove Control.
 *
 * Groove Control siezt; der Ton ist bewusst foermlicher als bei We Rock.
 * Der Rueckfall hier greift nur, solange die Fragen nicht in der Datenbank
 * gepflegt sind — im Normalfall stammen sie aus `inquiry_questions` und
 * werden im Admin bearbeitet.
 *
 * Die Rechtsseiten nutzen bewusst eigene Betreffzeilen und sind NICHT an
 * diese Vorlage angebunden.
 */

export const EVENT_QUESTIONS = [
  "In welcher Stadt findet Ihre Veranstaltung statt?",
  "In welcher Location feiern Sie?",
  "Wie viele Gäste werden in etwa erwartet?",
  "Gibt es dort Technik oder soll die Band diese mitbringen?",
  "Gibt es eine Bühne? Wie groß ist sie?",
  "Welche Besetzung wünschen Sie sich?",
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

/** Fertiger `mailto:`-Link mit vorausgefuelltem Betreff und Text. */
export const INQUIRY_MAIL_HREF = `mailto:${band.email}?subject=${encodeURIComponent(INQUIRY_MAIL_SUBJECT)}&body=${encodeURIComponent(INQUIRY_MAIL_BODY)}`;
