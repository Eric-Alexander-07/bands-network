import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import LightboxImage from "@/components/LightboxImage";

const SOCIAL_PHOTO = { src: "/images/social-news.webp", alt: "WE ROCK Live — Publikum" };

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

          <div className="social-photo-single" data-animate="fade-left">
            <LightboxImage
              src={SOCIAL_PHOTO.src}
              alt={SOCIAL_PHOTO.alt}
              wrapperClassName="social-photo-item"
              overlayContent="⊕"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
