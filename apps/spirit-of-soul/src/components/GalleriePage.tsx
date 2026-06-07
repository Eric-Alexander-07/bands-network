import GalleryGrid from "@/components/GalleryGrid";
import ConcentricRings from "@/components/ConcentricRings";
import type { MediaImage } from "@/lib/data";

const STATIC_IMAGES = [
  { src: "/images/about.webp",                        alt: "Spirit of Soul — Full Band" },
  { src: "/images/gallery/live-guitarist.webp",       alt: "Gitarrist auf der Bühne" },
  { src: "/images/gallery/live-vocalist-gold.webp",   alt: "Vocalist im Gold-Jacket" },
  { src: "/images/gallery/live-stage-duo.webp",       alt: "Sänger und Gitarrist" },
  { src: "/images/gallery/live-festival-singer.webp", alt: "Festival Performance" },
  { src: "/images/gallery/live-vocalist-hat.webp",    alt: "Lead Vocalist" },
  { src: "/images/hero.webp",                         alt: "Sängerin — Live Performance" },
];

interface Props { dbImages?: MediaImage[]; }

export default function GalleriePage({ dbImages = [] }: Props) {
  const images = dbImages.length > 0
    ? dbImages.map(img => ({ src: img.url, alt: img.caption ?? "" }))
    : STATIC_IMAGES;

  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-stage-duo.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Fotos</span>
          <h1>Galerie</h1>
          <p>Eindrücke von unseren Live-Auftritten, Studio-Sessions und Events.</p>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Live-Impressionen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Fotos</h2>
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
