import Link from "next/link";
import ConcentricRings from "@/components/ConcentricRings";
import SingerCarousel from "@/components/SingerCarousel";

type PC = Record<string, string>;

interface Props { content?: PC; }

export default function AboutPage({ content = {} }: Props) {
  const heroText  = content.text_top   || "7 Profimusiker. 4 Sänger. Pure Rockenergie auf jeder Bühne.";
  const mainImage = content.image_main || "/images/about.webp";
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
              <img src={mainImage} alt="WE ROCK — Live" />
            </div>
            <div className="about-simple-text" data-animate="fade-left">
              <span className="eyebrow">Die Classic Rock Tribute Show</span>
              <h2>Seit 2001.<br />Unzählige Bühnen.</h2>
              {mainParas ? (
                mainParas.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>
                    WE ROCK ist ein 7-köpfiges Profi-Ensemble aus der Rhein-Main-Region.
                    Mit vier wechselnden Frontsängern — darunter Emmo Acar und Jessica Conte —
                    und einem außergewöhnlich vielseitigen Sound bringen sie die Helden des Rock
                    authentisch auf die Bühne: Led Zeppelin, Deep Purple, AC/DC, Queen, Van Halen,
                    Bon Jovi und viele mehr.
                  </p>
                  <p>
                    Kraftvolle Stimmen, legendäre Gitarrenriffs und pure Rockenergie —
                    für jeden Event, jede Bühne. Von intimen Club-Shows bis zur
                    Full-Production-Show mit LED-Walls und professionellem Licht.
                  </p>
                </>
              )}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Link href="/booking" className="btn btn-primary">Jetzt anfragen</Link>
                <Link href="/services" className="btn btn-outline">Unsere Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SingerCarousel />
    </>
  );
}
