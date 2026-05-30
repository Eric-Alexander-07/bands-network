import Link from "next/link";
import { band } from "@/config/band";

const platforms = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook" as const, label: "Facebook" },
  { key: "youtube" as const, label: "YouTube" },
  { key: "spotify" as const, label: "Spotify" },
];

export default function AboutPage() {
  const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(band.socials.facebook)}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <>
      <section className="page-hero about-hero">
        <div className="container">
          <div className="about-hero-layout">
            <div className="about-hero-text">
              <span className="eyebrow">Unsere Geschichte</span>
              <h1>Über uns</h1>
              <p>{band.about.bio}</p>
            </div>
            <div className="about-hero-image" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Flexibel buchbar</span>
          <h2 className="section-title">Besetzung</h2>
          <p className="formations-intro">
            {band.name} ist für verschiedene Events in verschiedenen
            Besetzungen buchbar — von der eleganten kleinen Formation bis
            zur 12-köpfigen Full-Band mit Bläser Sektion.
          </p>
          <div className="formations-grid">
            <div className="formations-col">
              <h3 className="formations-col-title">Kleine Besetzungen</h3>
              <p className="formations-col-sub">
                Für private Events und kleinere Veranstaltungen (mit Halbplaybacks)
              </p>
              <ul className="formations-list">
                {band.formations.small.map((f, i) => (
                  <li key={i} className="formation-item">
                    <span className="formation-name">{f.name}</span>
                    <span className="formation-lineup">{f.lineup}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="formations-col">
              <h3 className="formations-col-title">Komplette Liveband</h3>
              <p className="formations-col-sub">
                Größere Besetzungen mit kompletter Live-Begleitung
              </p>
              <ul className="formations-list">
                {band.formations.full.map((f, i) => (
                  <li key={i} className="formation-item">
                    <span className="formation-name">{f.name}</span>
                    <span className="formation-lineup">{f.lineup}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="formations-cta">
            <Link href="/booking" className="btn btn-primary">
              Besetzung anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-social-section">
        <div className="container">
          <span className="eyebrow">Folgt uns</span>
          <h2 className="section-title">Social Media</h2>
          <p className="about-social-intro">
            Bleibt auf dem Laufenden — neue Termine, Fotos und
            Behind-the-Scenes direkt in eurem Feed.
          </p>
          <div className="about-social-platforms">
            {platforms.map((p) => (
              <a
                key={p.key}
                href={band.socials[p.key]}
                className="about-social-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="about-social-card-label">{p.label}</span>
                <span className="about-social-card-arrow">↗</span>
              </a>
            ))}
          </div>
          <div className="about-facebook-embed">
            <div className="about-facebook-label">
              <span className="eyebrow">Facebook</span>
            </div>
            <div className="about-facebook-frame">
              <iframe
                src={facebookEmbedUrl}
                width="500"
                height="600"
                style={{ border: "none", overflow: "hidden" }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Seite"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
