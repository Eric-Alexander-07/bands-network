import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";

export default function BookingCTA() {
  return (
    <section className="booking-cta">
      <div className="container booking-cta-inner">
        <span className="eyebrow" data-animate="fade-up">Jetzt anfragen</span>
        <h2 data-animate="fade-up" data-delay="100">
          Unvergessliche Musik<br />für Ihr Event
        </h2>
        <p data-animate="fade-up" data-delay="200">
          Von der kleinen Dinner Besetzung bis zur 12-köpfigen Full-Band mit Bläser Sektion &amp; Percussions — wir erstellen ein maßgeschneidertes Angebot für Ihre Veranstaltung.
        </p>
        <div className="booking-cta-actions" data-animate="fade-up" data-delay="300">
          <Link href="/booking" className="btn btn-gold">
            Buchung anfragen
          </Link>
          <a href={INQUIRY_MAIL_HREF} className="btn btn-outline-light">
            {band.email}
          </a>
        </div>
      </div>
    </section>
  );
}
