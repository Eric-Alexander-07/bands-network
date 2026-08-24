"use client";

import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import { useState, type FormEvent } from "react";

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "kontakt", name, email, subject, message, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : `Die Nachricht konnte nicht gesendet werden. Bitte versucht es erneut oder schreibt uns direkt an ${band.email}.`
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <>
      <section className="page-hero">
        <img src="/images/1778996767042-12piy.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Schreib uns</span>
          <h1>Kontakt</h1>
          <p>
            Fragen, allgemeine Anfragen oder einfach Hallo sagen — wir freuen
            uns von euch zu hören.
          </p>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-far-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="contact-grid">
            <div className="contact-info" data-animate="fade-right">
              <h2>Kontaktdaten</h2>
              <p>
                <strong>E-Mail</strong>
                <a href={INQUIRY_MAIL_HREF}>{band.email}</a>
              </p>
              <p>
                <strong>Standort</strong>
                {band.location}
              </p>
              <p>
                <strong>Buchungsanfragen</strong>
                Nutze bitte das{" "}
                <a href="/booking">Buchungsformular</a> für konkrete
                Event-Anfragen mit Datum und Details.
              </p>
              <div className="contact-socials">
                {Object.entries(band.socials).map(([key, url]) => (
                  <a key={key} href={url} className="footer-social-link"
                     target="_blank" rel="noopener noreferrer">
                    {key}
                  </a>
                ))}
              </div>
            </div>

            {submitted ? (
              <div className="form-success" data-animate="fade-left">
                <p className="form-success-title">Nachricht gesendet!</p>
                <p className="form-success-sub">
                  Wir melden uns so schnell wie möglich bei euch.
                </p>
              </div>
            ) : (
              <form className="contact-form" data-animate="fade-left" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Dein Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail</label>
                  <input type="email" id="email" name="email" placeholder="deine@email.de" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Betreff</label>
                  <input type="text" id="subject" name="subject" placeholder="Worum geht es?" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Nachricht</label>
                  <textarea id="message" name="message" rows={6} placeholder="Deine Nachricht..." required />
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
                {error && <p className="form-error">{error}</p>}
                <p className="form-hint">
                  Mit dem Absenden dieses Formulars werden eure Angaben zur Bearbeitung eurer
                  Anfrage gespeichert und per E-Mail verarbeitet. Weitere Infos dazu findet ihr
                  in unserer <a href="/datenschutz">Datenschutzerklärung</a>.
                </p>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? "Wird gesendet …" : "Nachricht senden"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
