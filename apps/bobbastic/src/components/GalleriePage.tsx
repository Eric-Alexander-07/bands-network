import GalleryGrid from "@/components/GalleryGrid";
import SoundBars from "@/components/SoundBars";
import type { MediaImage } from "@/lib/data";
import type { Content } from "@/lib/content";

/**
 * Greift nur, solange die Datenbank keine Galeriebilder liefert. Anders als
 * bei We Rock gibt es hier keine lokalen Ausweichbilder — die 28 Standardfotos
 * der Vorlage zeigen We Rock, nicht BOBbastic. Echte Fotos liegen ueber den
 * Seed in der Datenbank vor; ohne Supabase-Verbindung bleibt die Galerie leer.
 */
const STATIC_IMAGES: { src: string; alt: string }[] = [];

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
          <p>{c.page_hero_text}</p>
        </div>
      </section>

      <section className="section section-has-rings">
        <SoundBars className="bars-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="eyebrow" data-animate="fade-up">Live-Impressionen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.gallery_title}</h2>
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
