import Link from "next/link";
import ConcentricRings from "@/components/ConcentricRings";
import SingerCarousel from "@/components/SingerCarousel";

type PC = Record<string, string>;

interface Props { content?: PC; }

export default function AboutPage({ content = {} }: Props) {
  const heroText  = content.text_top   || "Wenn kraftvolle Stimmen, legendäre Gitarrenriffs und pure Rock-Energie aufeinandertreffen, dann heißt es: WE ROCK – The Classic Rock Tribute Show. Die Band bringt das Beste aus Classic Rock, Hard Rock und Melodic Rock der 70er- und 80er-Jahre bis in die Gegenwart auf die Bühne – authentisch, energiegeladen und mit jeder Menge Leidenschaft. Frontmann Emmo Acar und Sängerin Jessica Conte sorgen dabei gemeinsam mit einer hochkarätig besetzten Band aus Ausnahme-Musikern für ein mitreißendes Live-Erlebnis voller Power, Emotionen und echter Rock'n'Roll-Momente.";
  const mainImage = content.image_main || "/images/about.webp";
  const mainText  = content.text_bottom;
  const mainParas = mainText ? mainText.split("\n").filter(Boolean) : null;

  return (
    <>
      <section className="page-hero">
        <img src="/images/about-hero.webp" className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 28%" }} />
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
              <h2>Rock Hymnen für Euren Event!</h2>
              {mainParas ? (
                mainParas.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>
                  WE ROCK stehen für ehrliche Livemusik, Spielfreude und einen Abend voller unvergesslicher Rockklassiker. Mit maximaler Leidenschaft, musikalischer Klasse und viel Liebe zum Detail entführt die Band ihr Publikum auf eine Reise durch die größten Rock-Dekaden aller Zeiten. WE ROCK – die ultimative Classic Rock Party. Rockig - Leidenschaftlich - Handgemacht.
                </p>
              )}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Link href="/booking" className="btn btn-primary">Jetzt anfragen</Link>
                <Link href="/services" className="btn btn-outline">Programm & Besetzung</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SingerCarousel />
    </>
  );
}
