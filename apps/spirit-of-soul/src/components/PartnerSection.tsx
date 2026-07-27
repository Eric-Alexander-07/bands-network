import { band } from "@/config/band";
import {
  VMP_URL,
  MEDIA_PROFESSIONALS,
  ARTIST_POOL,
  hostLabel,
  type PartnerLink,
} from "@/lib/partners";

/** One card in a partner grid — a link when a URL exists, plain otherwise. */
function PartnerCard({ item }: { item: PartnerLink }) {
  const isCurrent = item.name === band.name;

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
    <a className="partner-card" href={item.url} target="_blank" rel="noopener noreferrer">
      <span className="partner-card-name">{item.name}</span>
      <span className="partner-card-meta">{hostLabel(item.url)}</span>
      <span className="partner-card-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

/**
 * Partner / Künstlerpool block — rendered at the bottom of the Referenzen page
 * (no own hero or CTA; those belong to the surrounding page).
 */
export default function PartnerSection() {
  return (
    <section className="section partner-section-block">
      <div className="container">
        <span className="eyebrow" data-animate="fade-up">Vivid Music Productions</span>
        <h2 className="section-title" data-animate="fade-up" data-delay="100">
          Partner &amp; Netzwerk
        </h2>
        <p className="partner-section-intro" data-animate="fade-up" data-delay="200">
          Wir arbeiten mit einem festen Netzwerk zusammen: erfahrene Foto- und
          Video-Profis sowie alle Bands aus dem VMP-Künstlerpool – jede mit ihrer
          eigenen Website.
        </p>

        <div className="partner-vmp-note" data-animate="fade-up">
          <p>
            {band.name} ist Teil des{" "}
            <strong>Vivid Music Productions</strong> Künstlerpools – einem
            Netzwerk aus Profibands, Musikern und Medienschaffenden für Events
            jeder Größe.
          </p>
          <a href={VMP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Vivid Music Productions →
          </a>
        </div>

        {/* Foto & Video */}
        <div className="partner-block">
          <h3 className="partner-block-title">Foto &amp; Video</h3>
          <div className="partner-groups">
            {MEDIA_PROFESSIONALS.map((grp) => (
              <div key={grp.title} className="partner-group" data-animate="fade-up">
                <div className="partner-group-head">
                  <h4 className="partner-group-title">{grp.title}</h4>
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

        {/* Künstlerpool */}
        <div className="partner-block">
          <h3 className="partner-block-title">Künstlerpool</h3>
          <div className="partner-groups">
            {ARTIST_POOL.map((cat) => (
              <div key={cat.category} className="partner-group" data-animate="fade-up">
                <div className="partner-group-head">
                  <h4 className="partner-group-title">{cat.category}</h4>
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
      </div>
    </section>
  );
}
