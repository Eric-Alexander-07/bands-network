import Link from "next/link";
import { band } from "@/config/band";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";
import ConcreteWall from "@/components/ConcreteWall";
import type { BesetzungGruppeWithEintraege } from "@/lib/data";
import type { Content } from "@/lib/content";

interface Props { dbBesetzung?: BesetzungGruppeWithEintraege[]; c: Content }

export default function ServicesPage({ dbBesetzung, c }: Props) {
  // Ein Song pro Zeile im Admin-Feld; leere Zeilen werden ignoriert.
  const songs = (c.repertoire_songs ?? "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const formations: Array<{ name: string; beschreibung: string | null; eintraege: Array<{ id: string; name: string; beschreibung: string | null }> }> =
    dbBesetzung && dbBesetzung.length > 0
      ? dbBesetzung.map(g => ({ name: g.name, beschreibung: g.beschreibung ?? null, eintraege: g.besetzung_eintraege ?? [] }))
      : [
          { name: "Kompakte Besetzungen", beschreibung: "Konzentrierte Energie für Dinner, Empfang und kleinere Rahmen", eintraege: band.formations.small.map((f, i) => ({ id: String(i), name: f.name, beschreibung: f.lineup })) },
          { name: "XL-Besetzung",         beschreibung: "Maximale Bühnenwirkung für Galas und große Events",             eintraege: band.formations.full.map((f, i) => ({ id: String(i), name: f.name, beschreibung: f.lineup })) },
        ];
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

      {/* Besetzung — volle Breite */}
      <section className="section section-has-rings besetzung-section">
        <ConcreteWall variant="edge" from="bottom-right" intensity={0.95} />
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Flexibel buchbar</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.besetzung_title}</h2>
          <p className="formations-intro" data-animate="fade-up" data-delay="200">
            {c.besetzung_text}
          </p>
          <div className="formations-grid" data-animate="fade-up">
            {(() => {
              const left  = formations[0];
              const right = formations[1];
              const rows  = Math.max(left?.eintraege.length ?? 0, right?.eintraege.length ?? 0);
              const cells = [
                <div key="hl" className="formations-col-header">
                  <h3 className="formations-col-title">{left?.name}</h3>
                  {left?.beschreibung && <p className="formations-col-sub">{left.beschreibung}</p>}
                </div>,
                <div key="hr" className="formations-col-header">
                  <h3 className="formations-col-title">{right?.name}</h3>
                  {right?.beschreibung && <p className="formations-col-sub">{right.beschreibung}</p>}
                </div>,
              ];
              for (let i = 0; i < rows; i++) {
                const l = left?.eintraege[i];
                const r = right?.eintraege[i];
                cells.push(
                  <div key={`l${i}`} className="formation-cell">
                    {l && <><span className="formation-name">{l.name}</span><span className="formation-lineup">{l.beschreibung}</span></>}
                  </div>,
                  <div key={`r${i}`} className="formation-cell">
                    {r && <><span className="formation-name">{r.name}</span><span className="formation-lineup">{r.beschreibung}</span></>}
                  </div>
                );
              }
              return cells;
            })()}
          </div>
        </div>
      </section>

      {/* Repertoire — Songliste als Kachelraster */}
      {songs.length > 0 && (
        <section className="section repertoire-section">
          <div className="container">
            <span className="eyebrow" data-animate="fade-up">Setlist</span>
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
            <div className="services-split-img services-split-img--tall" data-animate="fade-up">
              <img src={c.image_main} alt="The Adams Family auf der Bühne" />
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
