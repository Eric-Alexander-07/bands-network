import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import type { Content } from "@/lib/content";

interface Props { c: Content }

/** Absaetze aus einem Textfeld: Leerzeile = neuer Absatz, Zeilenumbruch = <br />. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").filter(Boolean).map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j, arr) => (
            <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
          ))}
        </p>
      ))}
    </>
  );
}

export default function ServicesPage({ c }: Props) {
  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 20%" }} />
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>{c.page_hero_title}</h1>
          <p>{c.text_top}</p>
        </div>
      </section>

      {/* Besetzung — Text */}
      <section className="section" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <img
          src="/images/logo_tansparent.png"
          alt=""
          aria-hidden="true"
          className="besetzung-bg-logo"
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Was wir anbieten</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.besetzung_title}</h2>
          <div className="besetzung-text" data-animate="fade-up" data-delay="200">
            <Paragraphs text={c.besetzung_text} />
          </div>

          <h3 className="section-title" style={{ marginTop: "2.5rem" }} data-animate="fade-up">{c.programm_title}</h3>
          <div className="besetzung-text" data-animate="fade-up" data-delay="100">
            <Paragraphs text={c.programm_text} />
          </div>
        </div>
      </section>

      {/* Technik — Bild links, Text rechts */}
      <section className="section technik-section">
        <div className="container">
          <div className="services-split services-split--imgfirst">
            <div className="services-split-img services-split-img--wide" data-animate="fade-up">
              <img src={c.image_main} alt="WE ROCK auf der Bühne" />
            </div>
            <div>
              <span className="eyebrow" data-animate="fade-up">Ton · Licht · Bühne</span>
              <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.technik_title}</h2>
              <p className="technik-intro" style={{ marginBottom: 24 }} data-animate="fade-up" data-delay="200">
                {c.technik_text}
              </p>
              <p className="technik-note" data-animate="fade-up">
                {c.technik_note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Individuelles Angebot</span>
          <h2>{c.cta_title}</h2>
          <p>
            {c.cta_text}
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Anfrage senden</Link>
            <a href={INQUIRY_MAIL_HREF} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
