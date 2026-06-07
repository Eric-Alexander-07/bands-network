import Link from "next/link";
import ConcentricRings from "@/components/ConcentricRings";

type PC = Record<string, string>;

interface Props { content?: PC; }

export default function AboutPage({ content = {} }: Props) {
  const heroText  = content.text_top   || "25 Jahre Soul, R&B und Funk auf internationalen Bühnen.\nEntertainment der Extraklasse.";
  const mainImage = content.image_main || "/images/gallery/live-stage-duo.webp";
  const mainText  = content.text_bottom;
  const mainParas = mainText ? mainText.split("\n").filter(Boolean) : null;

  return (
    <>
      <section className="page-hero">
        <img src="/images/about.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-text-narrow">
            <span className="eyebrow">Über die Band</span>
            <h1>Über uns</h1>
            <p>{heroText}</p>
          </div>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-left" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="about-simple-layout">
            <div className="about-simple-img" data-animate="fade-right">
              <img src={mainImage} alt="Spirit of Soul — Live" />
            </div>
            <div className="about-simple-text" data-animate="fade-left">
              <span className="eyebrow">The Finest Of Black Music</span>
              <h2>25 Jahre Bühne.<br />Eine Leidenschaft.</h2>
              {mainParas ? (
                mainParas.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>
                    Spirit of Soul steht seit 25 Jahren für erstklassiges Live-Entertainment.
                    Mit internationalen Sängern, erfahrenen Musikern und einer unverwechselbaren
                    Energie begeistert die Band Gäste bei Hochzeiten, Firmenevents, Stadtfesten
                    und exklusiven Galas europaweit.
                  </p>
                  <p>
                    Die Stärke liegt in der Musikalität und Spontanität aller Bandmitglieder —
                    das Programm wird kurzfristig auf der Bühne maßgeschneidert, damit der
                    erste Song das Publikum sofort bewegt.
                  </p>
                </>
              )}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Link href="/booking" className="btn btn-primary">Jetzt buchen</Link>
                <Link href="/services" className="btn btn-outline">Unsere Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
