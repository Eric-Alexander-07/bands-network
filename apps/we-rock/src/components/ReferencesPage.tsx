import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import PartnerSection from "@/components/PartnerSection";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import type { Referenz } from "@/lib/data";

/* Below this count, the scrolling 4-column marquee looks repetitive (too few
   unique items per column) — show a plain static grid instead. */
const MARQUEE_MIN_COUNT = 12;

export default function ReferencesPage({ refs = [] }: { refs?: Referenz[] }) {
  return (
    <>
      <section className="page-hero">
        <img src="/images/referenzen-header.webp" className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 48%" }} />
        <div className="container">
          <span className="eyebrow">Unsere Kunden</span>
          <h1>Referenzen</h1>
        </div>
      </section>

      <section className="section refs-section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Referenzen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            Unsere Kunden
          </h2>
          <p className="refs-intro" data-animate="fade-up" data-delay="200">
            Eine Auswahl der Unternehmen, Veranstalter und Privatkunden,
            die {band.name} für ihre Events gebucht haben.
          </p>
        </div>
        {refs.length >= MARQUEE_MIN_COUNT ? (
          <ReferencesMarquee refs={refs} />
        ) : (
          <div className="container">
            <div className="refs-simple-grid" data-animate="stagger">
              {refs.map((r, i) => (
                <div key={i} className="ref-chip">
                  {r.type && <span className="ref-chip-type">{r.type}</span>}
                  <span className="ref-chip-name">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <PartnerSection />

      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Nächstes Event</span>
          <h2>Auch dabei sein?</h2>
          <p>
            Schreib uns für Verfügbarkeiten und ein persönliches Angebot.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Buchung anfragen</Link>
            <a href={INQUIRY_MAIL_HREF} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
