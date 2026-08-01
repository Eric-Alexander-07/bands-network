import Link from "next/link";
import ConcentricRings from "@/components/ConcentricRings";
import SingerCarousel from "@/components/SingerCarousel";
import Lines from "@/components/Lines";
import type { Content } from "@/lib/content";
import type { BandMember } from "@/lib/data";

interface Props {
  /** Seitentexte: Datenbankwert mit Rueckfall auf den Schema-Standard. */
  c: Content;
  /** Saenger fuer das Karussell; leer = Rueckfall auf die Liste im Code. */
  members?: BandMember[];
}

export default function AboutPage({ c, members = [] }: Props) {
  const mainParas = c.text_bottom ? c.text_bottom.split("\n").filter(Boolean) : [];

  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <div className="page-hero-text-narrow">
            <span className="eyebrow">Über die Band</span>
            <h1>{c.page_hero_title}</h1>
            <p>{c.text_top}</p>
          </div>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-left" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="about-simple-layout">
            <div className="about-simple-img" data-animate="fade-right">
              <img src={c.image_main} alt="Spirit of Soul — Live" />
            </div>
            <div className="about-simple-text" data-animate="fade-left">
              <span className="eyebrow">The Finest Of Black Music</span>
              <h2><Lines text={c.about_title} /></h2>
              {mainParas.map((p, i) => <p key={i}>{p}</p>)}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Link href="/booking" className="btn btn-primary">Jetzt anfragen</Link>
                <Link href="/services" className="btn btn-outline">Unsere Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SingerCarousel title={c.members_title} members={members} />
    </>
  );
}
