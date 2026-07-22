import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import LightboxImage from "@/components/LightboxImage";

const GRID_PHOTOS = [
  { src: "/images/gallery/live-4.webp",  alt: "WE ROCK Live" },
  { src: "/images/gallery/live-8.webp",  alt: "WE ROCK Gitarrist" },
  { src: "/images/gallery/live-12.webp", alt: "WE ROCK auf der Bühne" },
  { src: "/images/gallery/live-16.webp", alt: "WE ROCK Festival" },
  { src: "/images/gallery/live-20.webp", alt: "WE ROCK Vocalist" },
  { src: "/images/social-news.webp",     alt: "WE ROCK Live" },
];

const PLATFORMS = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook"  as const, label: "Facebook"  },
  { key: "youtube"   as const, label: "YouTube"   },
];

export default function SocialSection() {
  return (
    <section className="section social-media-section section-has-rings">
      <ConcentricRings className="rings-right" />
      <div className="container">
        <div className="social-media-layout">

          <div className="social-media-text">
            <span className="eyebrow" data-animate="fade-up">Folgt uns</span>
            <h2 className="social-media-heading" data-animate="fade-up" data-delay="100">
              News auf Instagram<br />&amp; Facebook
            </h2>
            <p className="social-media-desc" data-animate="fade-up" data-delay="200">
              Bleibt up to date — neue Auftritte, Behind-the-Scenes und direkte Einblicke in unser Bandleben.
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
            {GRID_PHOTOS.map((photo, i) => (
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
