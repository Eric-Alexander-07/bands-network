import { band } from "@/config/band";

/**
 * Buchungsanfrage per E-Mail — The Adams Family.
 *
 * Die Band siezt. Die Fragen sind auf eine Tributeband zugeschnitten
 * (Buehne, Technik, Spieldauer, weitere Kuenstler) und stammen inhaltlich
 * vom Kontaktformular der bisherigen Bandwebsite.
 *
 * Der Rueckfall hier greift nur, solange die Fragen nicht in der Datenbank
 * gepflegt sind — im Normalfall stammen sie aus `inquiry_questions` und
 * werden im Admin bearbeitet.
 *
 * Die Rechtsseiten nutzen bewusst eigene Betreffzeilen und sind NICHT an
 * diese Vorlage angebunden.
 */

export const EVENT_QUESTIONS = [
  "In welcher Stadt findet Ihre Veranstaltung statt?",
  "In welcher Location beziehungsweise auf welchem Gelände?",
  "Wie viele Gäste werden in etwa erwartet?",
  "Gibt es eine Bühne? Wie groß ist sie?",
  "Ist Technik (PA, Licht, Monitoring) vor Ort oder soll die Band diese mitbringen?",
  "Wie lange soll die Band in etwa spielen?",
  "Treten noch andere Künstler an dem Abend auf?",
  "Wünschen Sie das akustische Unplugged-Set als Teil der Show?",
  "Unter welcher Telefonnummer erreichen wir Sie für Rückfragen?",
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
