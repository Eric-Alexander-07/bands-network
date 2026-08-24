import { Resend } from "resend";

/**
 * Absenderadresse fuer alle Mails aus dem Kontaktformular. Muss als Domain
 * (v-m-p.com) in Resend verifiziert sein (SPF/DKIM), sonst weist Resend den
 * Versand ab. Ueberschreibbar per Env, falls eine andere Absenderadresse
 * fuer We Rock verifiziert wird.
 */
export const CONTACT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "We Rock <no-reply@v-m-p.com>";

let client: Resend | null = null;

/**
 * Lazy statt `new Resend(...)` auf Modulebene: der Konstruktor wirft sofort,
 * wenn RESEND_API_KEY fehlt, und wuerde die Route sonst schon beim Import
 * abschiessen — noch bevor der try/catch in route.ts greifen kann.
 */
export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY ist nicht gesetzt.");
  }
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}
