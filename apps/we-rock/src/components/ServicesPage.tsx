import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import type { BesetzungGruppeWithEintraege } from "@/lib/data";

type PC = Record<string, string>;
interface Props { dbBesetzung?: BesetzungGruppeWithEintraege[]; content?: PC; }

export default function ServicesPage({ dbBesetzung, content = {} }: Props) {
  const formations: Array<{ name: string; beschreibung: string | null; eintraege: Array<{ id: string; name: string; beschreibung: string | null }> }> =
    dbBesetzung && dbBesetzung.length > 0
      ? dbBesetzung.map(g => ({ name: g.name, beschreibung: g.beschreibung ?? null, eintraege: g.besetzung_eintraege ?? [] }))
      : [
          { name: "Kleine Besetzungen", beschreibung: "Für private Events und kleinere Veranstaltungen (mit Halbplaybacks)", eintraege: band.formations.small.map((f, i) => ({ id: String(i), name: f.name, beschreibung: f.lineup })) },
          { name: "Komplette Liveband",  beschreibung: "Größere Besetzungen mit kompletter Live-Begleitung",               eintraege: band.formations.full.map((f, i) => ({ id: String(i), name: f.name, beschreibung: f.lineup })) },
        ];
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-vocalist-gold.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>Services</h1>
          <p>{content.text_top || `Vom intimen Dinner bis zur 12-köpfigen Full-Band mit Multimedia-Show — ${band.name} bringt die passende Musik und Technik für jeden Anlass.`}</p>
        </div>
      </section>

      {/* Besetzung — volle Breite */}
      <section className="section section-has-rings" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <ConcentricRings className="rings-far-right" />
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Flexibel buchbar</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Besetzung</h2>
          <p className="formations-intro" data-animate="fade-up" data-delay="200">
            {content.besetzung_text || `${band.name} ist für verschiedene Events in verschiedenen Besetzungen buchbar — von der eleganten kleinen Formation bis zur 12-köpfigen Full-Band mit Bläser Sektion.`}
          </p>
          <div className="formations-grid" data-animate="stagger">
            {formations.map((group, gi) => (
              <div key={gi} className="formations-col">
                <h3 className="formations-col-title">{group.name}</h3>
                {group.beschreibung && <p className="formations-col-sub">{group.beschreibung}</p>}
                <ul className="formations-list">
                  {group.eintraege.map(e => (
                    <li key={e.id} className="formation-item">
                      <span className="formation-name">{e.name}</span>
                      <span className="formation-lineup">{e.beschreibung}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technik — Bild links, Text rechts */}
      <section className="section technik-section">
        <div className="container">
          <div className="services-split services-split--imgfirst">
            <div className="services-split-img services-split-img--tall" data-animate="fade-up">
              <img src={content.image_main || "/images/gallery/live-stage-duo.webp"} alt="Spirit of Soul auf der Bühne" />
            </div>
            <div>
              <span className="eyebrow" data-animate="fade-up">Ton · Licht · Bühne</span>
              <h2 className="section-title" data-animate="fade-up" data-delay="100">Technik</h2>
              <p className="technik-intro" style={{ marginBottom: 24 }} data-animate="fade-up" data-delay="200">
                {content.technik_text || band.technik.intro}
              </p>
              <p className="technik-note" data-animate="fade-up">
                {band.technik.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Individuelles Angebot</span>
          <h2>Interesse?</h2>
          <p>
            Wir erstellen gerne ein maßgeschneidertes Angebot
            für Ihre Veranstaltung — inkl. Band, Bühne und Technik.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Anfrage senden</Link>
            <a href={`mailto:${band.email}`} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
