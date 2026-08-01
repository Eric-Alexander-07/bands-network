import GalleryGrid from "@/components/GalleryGrid";
import ConcentricRings from "@/components/ConcentricRings";
import type { MediaImage } from "@/lib/data";
import type { Content } from "@/lib/content";

const STATIC_IMAGES = [
  { src: "/images/spirit-of-soul-54.webp",          alt: "Spirit of Soul — Live" },
  { src: "/images/gallery/live-guitarist.webp",       alt: "Gitarrist auf der Bühne" },
  { src: "/images/gallery/live-vocalist-gold.webp",   alt: "Vocalist im Gold-Jacket" },
  { src: "/images/gallery/live-stage-duo.webp",       alt: "Sänger und Gitarrist" },
  { src: "/images/gallery/live-festival-singer.webp", alt: "Festival Performance" },
  { src: "/images/gallery/live-vocalist-hat.webp",    alt: "Lead Vocalist" },
];

interface Props { dbImages?: MediaImage[]; c: Content }

export default function GalleriePage({ dbImages = [], c }: Props) {
  const images = dbImages.length > 0
    ? dbImages.map(img => ({ src: img.url, alt: img.caption ?? "" }))
    : STATIC_IMAGES;

  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Fotos</span>
          <h1>{c.page_hero_title}</h1>
          <p>Eindrücke von unseren Live-Auftritten, Studio-Sessions und Events.</p>
        </div>
      </section>

      <section className="section section-has-rings">
        <ConcentricRings className="rings-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Live-Impressionen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.gallery_title}</h2>
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
