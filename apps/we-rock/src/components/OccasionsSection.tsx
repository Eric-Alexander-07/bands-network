import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";
import ConcentricRings from "@/components/ConcentricRings";
import type { Content } from "@/lib/content";
import type { SectionImage } from "@/lib/data";

/** Ausweichbilder, falls die Datenbank (noch) keine Karussellbilder liefert. */
const FALLBACK_PHOTOS = [
  { src: "/images/tribute-1.webp", alt: "WE ROCK – Tribute Show live" },
  { src: "/images/tribute-2.webp", alt: "WE ROCK – Tribute Show live" },
  { src: "/images/tribute-3.webp", alt: "WE ROCK – Tribute Show live" },
];

interface Props { c: Content; photos?: SectionImage[] }

export default function OccasionsSection({ c, photos = [] }: Props) {
  const carousel = photos.length
    ? photos.map(p => ({ src: p.url, alt: p.alt ?? "" }))
    : FALLBACK_PHOTOS;
  return (
    <section className="section occasions-section section-has-rings">
      <ConcentricRings className="rings-left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="occasions-layout">
          <div data-animate="fade-right">
            <PhotoCarousel photos={carousel} />
          </div>
          <div className="occasions-text">
            <span className="eyebrow" data-animate="fade-up">Die Bühne gehört Euch – der Sound gehört uns!</span>
            <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.occasions_title}</h2>
            <p className="occasions-desc" data-animate="fade-up" data-delay="200">
              {c.occasions_text}
            </p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/services" className="btn btn-primary">
                Unser Programm & Besetzung
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
