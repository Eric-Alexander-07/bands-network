import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import LightboxImage from "@/components/LightboxImage";
import Lines from "@/components/Lines";
import type { Content } from "@/lib/content";

const PLATFORMS = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook"  as const, label: "Facebook"  },
  { key: "youtube"   as const, label: "YouTube"   },
];

export default function SocialSection({ c }: { c: Content }) {
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

          <div className="social-photo-single" data-animate="fade-left">
            <LightboxImage
              src={c.social_image}
              alt="WE ROCK Live — Publikum"
              wrapperClassName="social-photo-item"
              overlayContent="⊕"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
