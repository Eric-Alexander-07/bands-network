import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import type { Referenz } from "@/lib/data";

export default function ReferencesPage({ refs = [] }: { refs?: Referenz[] }) {
  return (
    <>
      <section className="page-hero">
        <img src="/images/live-main.webp" className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 20%" }} />
        <div className="container">
          <span className="eyebrow">Unsere Kunden</span>
          <h1>Referenzen</h1>
          <p>
            {band.name} hat bei Hunderten von Events gespielt — von
            exklusiven Galas über Firmenfeiern bis zu internationalen
            Hochzeiten.
          </p>
        </div>
      </section>

      <section className="section refs-section section-has-rings">
        <ConcentricRings className="rings-lower-right" />
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Vertrauen uns</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            Unsere Kunden
          </h2>
          <p className="refs-intro" data-animate="fade-up" data-delay="200">
            Eine Auswahl der Unternehmen, Veranstalter und Privatkunden,
            die {band.name} für ihre Events gebucht haben.
          </p>
        </div>
        <ReferencesMarquee refs={refs} />
      </section>

      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Nächstes Event</span>
          <h2>Auch dabei sein?</h2>
          <p>
            Schreib uns für Verfügbarkeiten und ein persönliches Angebot.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Buchung anfragen</Link>
            <a href={`mailto:${band.email}`} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
