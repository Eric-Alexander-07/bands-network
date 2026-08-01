import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import LightboxImage from "@/components/LightboxImage";
import Lines from "@/components/Lines";
import type { Content } from "@/lib/content";
import type { SectionImage } from "@/lib/data";

const GRID_PHOTOS = [
  { src: "/images/gallery/live-vocalist-gold.webp", alt: "Live Performance" },
  { src: "/images/gallery/live-guitarist.webp",     alt: "Gitarrist" },
  { src: "/images/gallery/live-stage-duo.webp",     alt: "Auf der Bühne" },
  { src: "/images/gallery/live-festival-singer.webp", alt: "Festival" },
  { src: "/images/gallery/live-vocalist-hat.webp",  alt: "Vocalist" },
  { src: "/images/hero.webp",                       alt: "Sängerin Live" },
];

const PLATFORMS = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook"  as const, label: "Facebook"  },
  { key: "youtube"   as const, label: "YouTube"   },
];

interface Props { c: Content; photos?: SectionImage[] }

export default function SocialSection({ c, photos = [] }: Props) {
  const grid = photos.length ? photos.map(p => ({ src: p.url, alt: p.alt ?? "" })) : GRID_PHOTOS;
  return (
    <section className="section social-media-section section-has-rings">
      <ConcentricRings className="rings-right" />
      <div className="container">
        <div className="social-media-layout">

          <div className="social-media-text">
            <span className="eyebrow" data-animate="fade-up">Folgt uns</span>
            <h2 className="social-media-heading" data-animate="fade-up" data-delay="100">
              <Lines text={c.social_title} />
            </h2>
            <p className="social-media-desc" data-animate="fade-up" data-delay="200">
              {c.social_text}
            </p>

            <div className="social-platform-links" data-animate="stagger">
              {PLATFORMS.map((p) => (
                <a
                  key={p.key}
                  href={band.socials[p.key]}
                  className="social-platform-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{p.label}</span>
                  <span className="social-platform-arrow">↗</span>
                </a>
              ))}
            </div>

            <div data-animate="fade-up" data-delay="400">
              <Link href="/media" className="social-media-cta">
                <span className="social-media-cta-bar" />
                Alle News &amp; Medien ansehen
              </Link>
            </div>
          </div>

          <div className="social-photo-grid" data-animate="fade-left">
            {grid.map((photo, i) => (
              <LightboxImage
                key={i}
                src={photo.src}
                alt={photo.alt}
                wrapperClassName="social-photo-item"
                overlayContent="⊕"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
