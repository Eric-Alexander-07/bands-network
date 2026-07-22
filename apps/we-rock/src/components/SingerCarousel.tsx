"use client";
import { useRef } from "react";

/* Namen dienen nur als alt-Text (SEO) und werden auf der Seite nicht sichtbar angezeigt. */
const SINGERS = [
  { src: "/images/saenger/jessica-conte.webp",   name: "Jessica Conte" },
  { src: "/images/saenger/emmo-acar.webp",       name: "Emmo Acar" },
  { src: "/images/saenger/bobby-stoecker.webp",  name: "Bobby Stöcker" },
  { src: "/images/saenger/juergen-lucas.webp",   name: "Jürgen Lucki Lucas" },
  { src: "/images/saenger/heiko-elger.webp",     name: "Heiko Elger" },
  { src: "/images/saenger/axel-balke.webp",      name: "Axel Balke" },
  { src: "/images/saenger/armin-donderer.webp",  name: "Armin Donderer" },
  { src: "/images/saenger/jake-voth.webp",       name: "Jake Voth" },
  { src: "/images/saenger/david-readman.webp",   name: "David Readman" },
];

export default function SingerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    if (!trackRef.current) return;
    const cardW = (trackRef.current.querySelector(".singer-card") as HTMLElement | null)?.offsetWidth ?? 280;
    trackRef.current.scrollBy({ left: dir * (cardW + 16) * 3, behavior: "smooth" });
  };

  return (
    <section className="section singer-carousel-section">
      <div className="container">
        <span className="eyebrow" data-animate="fade-up">Die Musiker</span>
        <h2 className="section-title" data-animate="fade-up" data-delay="100">Die Band</h2>

        <div className="singer-carousel-wrap" data-animate="fade-up" data-delay="200">
          <button
            className="singer-carousel-btn singer-carousel-btn--prev"
            onClick={() => scroll(-1)}
            aria-label="Zurück"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="singer-carousel-track" ref={trackRef}>
            {SINGERS.map((singer, i) => (
              <div key={i} className="singer-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={singer.src} alt={singer.name} />
              </div>
            ))}
          </div>

          <button
            className="singer-carousel-btn singer-carousel-btn--next"
            onClick={() => scroll(1)}
            aria-label="Weiter"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
