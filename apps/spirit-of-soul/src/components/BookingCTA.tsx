import Link from "next/link";
import { band } from "@/config/band";

export default function BookingCTA() {
  return (
    <section className="section booking-cta">
      <div className="container booking-cta-inner">
        <span className="eyebrow">Jetzt anfragen</span>
        <h2>{band.name}</h2>
        <p>
          Macht euer Event unvergesslich. Jetzt Verfügbarkeit und Konditionen
          anfragen.
        </p>
        <div className="booking-cta-actions">
          <Link href="/booking" className="btn btn-primary">
            Buchung anfragen
          </Link>
          <a href={`mailto:${band.email}`} className="btn btn-ghost">
            {band.email}
          </a>
        </div>
      </div>
    </section>
  );
}
