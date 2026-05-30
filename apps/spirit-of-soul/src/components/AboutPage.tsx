import { band } from "@/config/band";

const platforms = [
  { key: "instagram" as const, label: "Instagram", handle: "@" },
  { key: "facebook" as const, label: "Facebook", handle: "facebook.com/" },
  { key: "youtube" as const, label: "YouTube", handle: "youtube.com/" },
  { key: "spotify" as const, label: "Spotify", handle: "open.spotify.com/" },
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
              <h1>Über {band.name}</h1>
              <p>{band.about.bio}</p>
            </div>
            <div className="about-hero-image about-image-placeholder" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Das Team</span>
          <h2 className="section-title">Bandmitglieder</h2>
          <div className="members-grid">
            {band.about.members.map((member, i) => (
              <div key={i} className="member-card">
                <div className="member-photo-placeholder" />
                <div className="member-info">
                  <p className="member-name">{member.name}</p>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
            ))}
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
              <span className="eyebrow">Facebook-Seite</span>
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
