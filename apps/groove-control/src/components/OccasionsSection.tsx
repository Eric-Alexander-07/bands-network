import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";
import type { Content } from "@/lib/content";
import type { SectionImage } from "@/lib/data";

/** Ausweichbilder, falls die Datenbank (noch) keine Karussellbilder liefert. */
const FALLBACK_PHOTOS = [
  { src: "/images/placeholder.svg", alt: "Groove Control — Bild folgt" },
  { src: "/images/placeholder.svg", alt: "Groove Control — Bild folgt" },
  { src: "/images/placeholder.svg", alt: "Groove Control — Bild folgt" },
];

interface Props { c: Content; photos?: SectionImage[] }

export default function OccasionsSection({ c, photos = [] }: Props) {
  const carousel = photos.length
    ? photos.map(p => ({ src: p.url, alt: p.alt ?? "" }))
    : FALLBACK_PHOTOS;
  return (
    <section className="section occasions-section section-has-rings">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="occasions-layout">
          <div data-animate="fade-right">
            <PhotoCarousel photos={carousel} />
          </div>
          <div className="occasions-text">
            <span className="eyebrow" data-animate="fade-up">Ihr Anlass, unser Programm</span>
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
