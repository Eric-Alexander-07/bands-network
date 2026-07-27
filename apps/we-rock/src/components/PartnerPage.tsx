import Link from "next/link";
import { band } from "@/config/band";
import {
  VMP_URL,
  MEDIA_PROFESSIONALS,
  ARTIST_POOL,
  hostLabel,
  type PartnerLink,
} from "@/lib/partners";
import { INQUIRY_MAIL_HREF } from "@/lib/inquiryMail";

/** One card in a partner grid — a link when a URL exists, plain otherwise. */
function PartnerCard({ item }: { item: PartnerLink }) {
  const isCurrent = item.name === band.name;

  // The current band's own site — highlight, don't link away.
  if (isCurrent) {
    return (
      <div className="partner-card partner-card--current">
        <span className="partner-card-name">{item.name}</span>
        <span className="partner-card-meta">Diese Website</span>
      </div>
    );
  }

  if (!item.url) {
    return (
      <div className="partner-card partner-card--plain">
        <span className="partner-card-name">{item.name}</span>
        <span className="partner-card-meta">Auf Anfrage</span>
      </div>
    );
  }

  return (
    <a
      className="partner-card"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="partner-card-name">{item.name}</span>
      <span className="partner-card-meta">{hostLabel(item.url)}</span>
      <span className="partner-card-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

export default function PartnerPage() {
  return (
    <>
      <section className="page-hero">
        <img
          src="/images/referenzen-header.webp"
          className="page-hero-bg-img"
          alt=""
          aria-hidden="true"
          style={{ objectPosition: "center 42%" }}
        />
        <div className="container">
          <span className="eyebrow">Vivid Music Productions</span>
          <h1>Partner</h1>
          <p>
            Fotografen und Videografen, die unsere Events professionell
            festhalten – sowie alle Bands aus dem VMP-Künstlerpool mit ihren
            eigenen Websites.
          </p>
        </div>
      </section>

      {/* VMP-Zugehörigkeit */}
      <section className="section">
        <div className="container">
          <div className="partner-vmp-note" data-animate="fade-up">
            <p>
              {band.name} ist Teil des{" "}
              <strong>Vivid Music Productions</strong> Künstlerpools – einem
              Netzwerk aus Profibands, Musikern und Medienschaffenden für
              Events jeder Größe.
            </p>
            <a
              href={VMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Vivid Music Productions →
            </a>
          </div>
        </div>
      </section>

      {/* Foto & Video */}
      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Foto &amp; Video</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            Unsere Medienprofis
          </h2>
          <p className="partner-section-intro" data-animate="fade-up" data-delay="200">
            Erfahrene Fotografen und Videografen, mit denen wir seit Jahren
            zusammenarbeiten und die das Besondere eines jeden Events einfangen.
          </p>

          <div className="partner-groups">
            {MEDIA_PROFESSIONALS.map((grp) => (
              <div key={grp.title} className="partner-group" data-animate="fade-up">
                <div className="partner-group-head">
                  <h3 className="partner-group-title">{grp.title}</h3>
                </div>
                <div className="partner-grid">
                  {grp.people.map((p) => (
                    <PartnerCard key={p.name} item={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Künstlerpool */}
      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Künstlerpool</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">
            Unsere Bands
          </h2>
          <p className="partner-section-intro" data-animate="fade-up" data-delay="200">
            Jede Band aus dem VMP-Künstlerpool hat ihre eigene Präsenz. Hier
            findet Ihr direkte Links zu allen Bands.
          </p>

          <div className="partner-groups">
            {ARTIST_POOL.map((cat) => (
              <div key={cat.category} className="partner-group" data-animate="fade-up">
                <div className="partner-group-head">
                  <h3 className="partner-group-title">{cat.category}</h3>
                  <p className="partner-group-desc">{cat.description}</p>
                </div>
                <div className="partner-grid">
                  {cat.bands.map((b) => (
                    <PartnerCard key={b.name} item={b} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Euer Event</span>
          <h2>Mehr als eine Band</h2>
          <p>
            Ob Band, Foto oder Video – über den VMP-Künstlerpool stellen wir das
            passende Team für Euer Event zusammen.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Anfrage senden</Link>
            <a href={INQUIRY_MAIL_HREF} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
