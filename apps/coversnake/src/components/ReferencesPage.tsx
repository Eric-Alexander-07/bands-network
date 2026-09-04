import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import PartnerSection from "@/components/PartnerSection";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import type { Referenz, PartnerGruppeWithEintraege } from "@/lib/data";
import type { Content } from "@/lib/content";

/* Below this count, the scrolling 4-column marquee looks repetitive (too few
   unique items per column) — show a plain static grid instead. */
const MARQUEE_MIN_COUNT = 12;

interface Props {
  refs?: Referenz[];
  c: Content;
  partnerGruppen?: PartnerGruppeWithEintraege[];
}

export default function ReferencesPage({ refs = [], c, partnerGruppen = [] }: Props) {
  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 48%" }} />
        <div className="container">
          <span className="eyebrow">Unsere Kunden</span>
          <h1>{c.page_hero_title}</h1>
        </div>
      </section>

      {refs.length > 0 && (
      <section className="section refs-section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Referenzen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            {c.referenzen_title}
          </h2>
          <p className="refs-intro" data-animate="fade-up" data-delay="200">
            {c.referenzen_text}
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
      )}

      <PartnerSection c={c} gruppen={partnerGruppen} />

      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Nächstes Event</span>
          <h2>{c.cta_title}</h2>
          <p>
            {c.cta_text}
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
