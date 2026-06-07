"use client";

import { useState, type FormEvent } from "react";
import { band } from "@/config/band";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="booking-layout">
      <div className="booking-info">
        <span className="eyebrow">Kontakt aufnehmen</span>
        <h2>{band.name} buchen</h2>
        <p>
          Schreibt uns für Verfügbarkeiten, Konditionen und individuelle
          Wünsche. Wir melden uns in der Regel innerhalb von 24 Stunden.
        </p>
        <div className="booking-contact">
          <div>
            <span className="booking-contact-label">E-Mail</span>
            <a href={`mailto:${band.email}`} className="booking-contact-value">
              {band.email}
            </a>
          </div>
          <div>
            <span className="booking-contact-label">Standort</span>
            <span className="booking-contact-value">{band.location}</span>
          </div>
        </div>

        <div className="booking-checklist">
          <p className="booking-checklist-title">Hilfreiche Angaben für Ihre Anfrage</p>
          <ul className="booking-checklist-list">
            <li>In welcher Stadt findet Ihre Veranstaltung statt?</li>
            <li>In welcher Location feiern Sie?</li>
            <li>Wie viele Gäste werden in etwa erwartet?</li>
            <li>Gibt es dort Technik, oder soll die Band diese mitbringen?</li>
            <li>Gibt es eine Bühne?</li>
            <li>Haben Sie einen Budgetrahmen, oder welche Besetzung wünschen Sie?</li>
            <li>Wie lange soll die Band in etwa spielen?</li>
            <li>Treten noch andere Künstler an dem Abend auf?</li>
            <li>Wünschen Sie Pausenmusik oder einen DJ-Service der Band?</li>
            <li>Für eventuelle Rückfragen: bitte Telefonnummer angeben.</li>
          </ul>
        </div>
      </div>

      {submitted ? (
        <div className="form-success">
          <p className="form-success-title">Nachricht gesendet!</p>
          <p className="form-success-sub">
            Wir melden uns so schnell wie möglich bei euch.
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
              {band.occasions.map((o, i) => (
                <option key={i} value={o.title}>
                  {o.title}
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
              placeholder="Erzählt uns von eurer Veranstaltung ..."
            />
          </div>
          <div>
            <button type="submit" className="btn btn-gold" style={{ padding: "14px 40px", fontSize: "12px" }}>
              Anfrage senden
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
