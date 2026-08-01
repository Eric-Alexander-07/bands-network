import Link from "next/link";
import { band } from "@/config/band";
import DotGrid from "@/components/DotGrid";
import LightboxImage from "@/components/LightboxImage";
import Lines from "@/components/Lines";
import type { Content } from "@/lib/content";

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
  tiktok: "TikTok",
};

/**
 * Nur Profile anzeigen, die tatsaechlich gepflegt sind — Groove Control hat
 * bisher nur Instagram. Fehlende Plattformen erzeugen sonst tote Links.
 */
const PLATFORMS = Object.entries(band.socials)
  .filter(([, url]) => Boolean(url))
  .map(([key, url]) => ({ key, url, label: PLATFORM_LABELS[key] ?? key }));

export default function SocialSection({ c }: { c: Content }) {
  return (
    <section className="section social-media-section section-has-rings">
      <DotGrid variant="cluster" origin={{ x: 1.05, y: 0.5 }} spread={0.9} intensity={0.3} />
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
                  href={p.url}
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
              alt="Groove Control Live"
              wrapperClassName="social-photo-item"
              overlayContent="⊕"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
