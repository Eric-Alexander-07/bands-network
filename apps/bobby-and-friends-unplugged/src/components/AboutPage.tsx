import Link from "next/link";
import SoundWaves from "@/components/SoundWaves";
import SingerCarousel from "@/components/SingerCarousel";
import type { Content } from "@/lib/content";
import type { BandMember } from "@/lib/data";

interface Props {
  /** Seitentexte: Datenbankwert mit Rueckfall auf den Schema-Standard. */
  c: Content;
  /** Musiker fuer das Karussell; leer = Rueckfall auf die Liste im Code. */
  members?: BandMember[];
}

export default function AboutPage({ c, members = [] }: Props) {
  const mainParas = c.text_bottom ? c.text_bottom.split("\n").filter(Boolean) : [];

  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 28%" }} />
        <div className="container">
          <div className="page-hero-text-narrow">
            <span className="eyebrow">Über die Band</span>
            <h1>{c.page_hero_title}</h1>
            <p>{c.text_top}</p>
          </div>
        </div>
      </section>

      <section className="section section-has-rings">
        <SoundWaves variant="cluster" origin={{ x: 1.06, y: 0.18 }} spread={0.8} seed={1} intensity={0.22} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="about-simple-layout">
            <div className="about-simple-img" data-animate="fade-right">
              <img src={c.image_main} alt="Bobby & Friends Unplugged — Live" />
            </div>
            <div className="about-simple-text" data-animate="fade-left">
              <span className="eyebrow">Gitarre & Gesang</span>
              <h2>{c.about_title}</h2>
              {mainParas.map((p, i) => <p key={i}>{p}</p>)}
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <Link href="/booking" className="btn btn-primary">Jetzt anfragen</Link>
                <Link href="/services" className="btn btn-outline">Programm & Besetzung</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SingerCarousel title={c.members_title} members={members} />
    </>
  );
}
