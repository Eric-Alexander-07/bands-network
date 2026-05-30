import Link from "next/link";
import { band } from "@/config/band";

export default function BookingCTA() {
  return (
    <section className="booking-cta">
      <div className="container booking-cta-inner">
        <span className="eyebrow">Jetzt anfragen</span>
        <h2>Unvergessliche Musik<br />für Ihr Event</h2>
        <p>
          Von der Dinner-Besetzung bis zur 12-köpfigen Full-Band — wir
          erstellen ein maßgeschneidertes Angebot für Ihre Veranstaltung.
        </p>
        <div className="booking-cta-actions">
          <Link href="/booking" className="btn btn-gold">
            Buchung anfragen
          </Link>
          <a href={`mailto:${band.email}`} className="btn btn-outline-light">
            {band.email}
          </a>
        </div>
      </div>
    </section>
  );
}
