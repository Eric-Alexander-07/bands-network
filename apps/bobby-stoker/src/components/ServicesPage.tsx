import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import StageRays from "@/components/StageRays";
import type { Content } from "@/lib/content";

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

export default function ServicesPage({ c }: { c: Content }) {
  // Ein Song pro Zeile im Admin-Feld; leere Zeilen werden ignoriert.
  const songs = (c.repertoire_songs ?? "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>{c.page_hero_title}</h1>
          <p>{c.text_top}</p>
        </div>
      </section>

      {/* Besetzung — Freitext, da fuer diese Band keine mehreren
          Besetzungsgroessen belegt sind (anders als bei The Adams Family). */}
      <section className="section section-has-rings">
        <StageRays className="rays-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Auf der Bühne</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.besetzung_title}</h2>
          <div className="besetzung-text" data-animate="fade-up" data-delay="200">
            <Paragraphs text={c.besetzung_text} />
          </div>
        </div>
      </section>

      {/* Repertoire — Songliste als Kachelraster (aktuell das "Everglow"-Tracklisting) */}
      {songs.length > 0 && (
        <section className="section repertoire-section">
          <div className="container">
            <span className="eyebrow" data-animate="fade-up">Album „Everglow“</span>
            <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.repertoire_title}</h2>
            <p className="repertoire-intro" data-animate="fade-up" data-delay="200">{c.repertoire_text}</p>
            <ul className="repertoire-grid" data-animate="stagger">
              {songs.map((song, i) => (
                <li key={i} className="repertoire-item">
                  <span className="repertoire-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="repertoire-title">{song}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Technik — Bild links, Text rechts */}
      <section className="section technik-section">
        <div className="container">
          <div className="services-split services-split--imgfirst">
            <div className="services-split-img services-split-img--wide" data-animate="fade-up">
              <img src={c.image_main} alt="Bobby Stoker Band auf der Bühne" />
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
