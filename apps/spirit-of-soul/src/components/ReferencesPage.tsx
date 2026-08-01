import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import ConcentricRings from "@/components/ConcentricRings";
import PartnerSection from "@/components/PartnerSection";
import ReferencesMarquee from "@/components/ReferencesMarquee";
import type { Referenz, PartnerGruppeWithEintraege } from "@/lib/data";
import type { Content } from "@/lib/content";

interface Props {
  refs?: Referenz[];
  c: Content;
  partnerGruppen?: PartnerGruppeWithEintraege[];
}

export default function ReferencesPage({ refs = [], c, partnerGruppen = [] }: Props) {
  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Unsere Kunden</span>
          <h1>{c.page_hero_title}</h1>
          <p>
            {c.page_hero_text}
          </p>
        </div>
      </section>

      <section className="section refs-section section-has-rings">
        <ConcentricRings className="rings-lower-right" />
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Vertrauen uns</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            {c.referenzen_title}
          </h2>
          <p className="refs-intro" data-animate="fade-up" data-delay="200">
            {c.referenzen_text}
          </p>
        </div>
        <ReferencesMarquee refs={refs} />
      </section>

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
