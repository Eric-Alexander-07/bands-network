import Link from "next/link";
import { band } from "@/config/band";

const platforms = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
  { key: "spotify", label: "Spotify" },
] as const;

export default function SocialSection() {
  return (
    <section className="section social-section">
      <div className="container">
        <div className="social-layout">
          <div className="social-text">
            <span className="eyebrow">Folgt uns</span>
            <h2 className="section-title">Social Media</h2>
            <p className="social-desc">
              Folgt {band.name} auf Social Media und bleibt immer up to date —
              neue Auftritte, Behind-the-Scenes und mehr.
            </p>
            <div className="social-platforms">
              {platforms.map((p) => (
                <a
                  key={p.key}
                  href={band.socials[p.key]}
                  className="social-platform-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.label}
                </a>
              ))}
            </div>
            <Link href="/about" className="btn btn-primary social-cta">
              Mehr erfahren
            </Link>
          </div>
          <div className="social-images">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="social-post-placeholder">
                <span className="social-post-label">POST</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
