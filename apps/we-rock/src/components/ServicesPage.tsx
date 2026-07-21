import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";

type PC = Record<string, string>;
interface Props { content?: PC; }

export default function ServicesPage({ content = {} }: Props) {
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-1.webp" className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 20%" }} />
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>Programm & Besetzung</h1>
          <p>{content.text_top || `Vom intimen Dinner bis zur 9-köpfigen Full-Band mit Multimedia-Show — ${band.name} bringt die passende Musik und Energie für jeden Anlass.`}</p>
        </div>
      </section>

      {/* Besetzung — Text */}
      <section className="section section-has-rings" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <ConcentricRings className="rings-far-right" />
        <img
          src="/images/logo_tansparent.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "160px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "680px",
            opacity: 0.28,
            pointerEvents: "none",
            userSelect: "none",
            filter: "brightness(0.5)",
            zIndex: 0,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Was wir anbieten</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Besetzung</h2>
          <div className="besetzung-text" data-animate="fade-up" data-delay="200">
            {content.besetzung_text ? (
              content.besetzung_text.split("\n\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para.split("\n").map((line, j, arr) => (
                  <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                ))}</p>
              ))
            ) : (
              <>
                <p>
                  Insgesamt sind wir in der Ausgangsbesetzung 7 Musiker und ein Techniker.
                  2 Sänger bilden die Frontstimmen, und fünf Profimusiker aus dem Rhein-Main-Gebiet die Begleitband.
                </p>
                <p>
                  Das besondere Highlight von WE ROCK: Fast alle Musiker der Band übernehmen zusätzlich Gesangsparts.
                  Dadurch gibt es auch bei der 7er Besetzung alleine 4 Lead-Stimmen und es entsteht ein außergewöhnlich
                  vielseitiger und authentischer Sound mit einem breitgefächerten Programm – perfekt für die großen
                  Rockklassiker & Hymnen unterschiedlichster Dekaden und Stilrichtungen. Je nach Event und Verfügbarkeit
                  kann es sein, dass auch die Frontsänger einmal wechseln, oder bei großen Events und Bühnen weitere
                  hinzugenommen werden. So kann die Band sogar auf bis zu 9 Akteure ausgebaut werden.
                </p>
              </>
            )}
          </div>

          <h3 className="section-title" style={{ marginTop: "2.5rem" }} data-animate="fade-up">Programm</h3>
          <div className="besetzung-text" data-animate="fade-up" data-delay="100">
            <p>
              Musikalisch spannt die Band den Bogen von den legendären Hymnen von Led Zeppelin, Deep Purple und
              Whitesnake über Hardrock-Ikonen wie Queen, Bon Jovi, Dio, Rainbow, AC/DC, Van Halen, Ozzy Osbourne
              und Guns N&apos; Roses bis hin zu melodischem Arena Rock von Journey und Foreigner. Auch Bluesrock-Perlen
              von Gary Moore, Billy Idol, ZZ-Top, Toto oder The Black Crowes dürfen dabei natürlich nicht fehlen.
              Auf Wunsch kann die Band sogar einzelne kleine Tribute Blocks von 4–5 Songs einzelner Bands wie
              Whitesnake, Deep Purple, Bryan Adams oder Journey mit ins Programm einbauen.
            </p>
          </div>
        </div>
      </section>

      {/* Technik — Bild links, Text rechts */}
      <section className="section technik-section">
        <div className="container">
          <div className="services-split services-split--imgfirst">
            <div className="services-split-img services-split-img--wide" data-animate="fade-up">
              <img src={content.image_main || "/images/gallery/live-8.webp"} alt="WE ROCK auf der Bühne" />
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
