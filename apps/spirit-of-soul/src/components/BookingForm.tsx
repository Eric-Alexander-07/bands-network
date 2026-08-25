"use client";

import { useState, type FormEvent } from "react";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import Rich from "@/components/Rich";
import type { Content } from "@/lib/content";
import type { Occasion, InquiryQuestion } from "@/lib/data";

interface Props {
  c: Content;
  /** Anlaesse fuer die Auswahlliste; leer = Rueckfall auf band.ts. */
  occasions?: Occasion[];
  /** Fragen fuer Checkliste und Mailvorlage; leer = Rueckfall auf den Code. */
  questions?: InquiryQuestion[];
}

export default function BookingForm({ c, occasions = [], questions = [] }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const anlaesse = occasions.length ? occasions.map(o => o.title) : band.occasions.map(o => o.title);
  const checklist = questions;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const occasion = (form.elements.namedItem("occasion") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;

    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "booking", name, email, phone, date, occasion, message, website }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : `Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an ${band.email}.`
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="booking-layout">
      <div className="booking-info">
        <span className="eyebrow">Kontakt aufnehmen</span>
        <h2>{c.booking_title}</h2>
        <p>
          {c.booking_text}
        </p>
        <div className="booking-contact">
          <div>
            <span className="booking-contact-label">{c.booking_email_label}</span>
            <a href={INQUIRY_MAIL_HREF} className="booking-contact-value">
              {band.email}
            </a>
          </div>
          <div>
            <span className="booking-contact-label">{c.booking_location_label}</span>
            <span className="booking-contact-value">{band.location}</span>
          </div>
        </div>

        <p className="booking-checklist-intro">
          {c.booking_checklist_intro}
        </p>

        <div className="booking-checklist">
          <p className="booking-checklist-title">{c.booking_checklist_title}</p>
          <ul className="booking-checklist-list">
            <li><Rich text={c.booking_checklist_first} /></li>
            {checklist.map(q => (
              <li key={q.id}><Rich text={q.text} /></li>
            ))}
          </ul>
        </div>
      </div>

      {submitted ? (
        <div className="form-success">
          <p className="form-success-title">Nachricht gesendet!</p>
          <p className="form-success-sub">
            Wir melden uns so schnell wie möglich bei Ihnen.
          </p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Vor- und Nachname"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="ihre@email.de"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+49 ..."
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Veranstaltungsdatum
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="occasion">
              Anlass
            </label>
            <select id="occasion" name="occasion" className="form-select">
              <option value="">Bitte auswählen ...</option>
              {anlaesse.map((title, i) => (
                <option key={i} value={title}>
                  {title}
                </option>
              ))}
              <option value="other">Sonstiges</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              rows={18}
              placeholder="Bitte beachten Sie die Fragen links, damit wir Ihnen ein möglichst gutes Angebot erstellen können."
            />
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
            Mit dem Absenden dieses Formulars werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
            gespeichert und per E-Mail verarbeitet. Weitere Informationen dazu finden Sie in
            unserer <a href="/datenschutz">Datenschutzerklärung</a>.
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-gold"
              style={{ padding: "14px 40px", fontSize: "12px" }}
              disabled={sending}
            >
              {sending ? "Wird gesendet …" : "Anfrage senden"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
