import GalleryGrid from "@/components/GalleryGrid";
import ConcentricRings from "@/components/ConcentricRings";
import type { MediaImage } from "@/lib/data";

const STATIC_IMAGES = Array.from({ length: 28 }, (_, i) => ({
  src: `/images/gallery/live-${i + 1}.webp`,
  alt: `WE ROCK Live — Foto ${i + 1}`,
}));

interface Props { dbImages?: MediaImage[]; }

export default function GalleriePage({ dbImages = [] }: Props) {
  const images = dbImages.length > 0
    ? dbImages.map(img => ({ src: img.url, alt: img.caption ?? "" }))
    : STATIC_IMAGES;

  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-3.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
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
