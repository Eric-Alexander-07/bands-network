import { band } from "@/config/band";

export default function ReferencesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Referenzen</span>
          <h1>Unsere Auftritte</h1>
          <p>
            Eine Auswahl an Events und Veranstaltungen, bei denen {band.name}{" "}
            performt hat.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="references-grid">
            {band.references.map((ref, i) => (
              <article key={i} className="reference-card">
                <div className="reference-photo-placeholder" />
                <div className="reference-body">
                  <span className="reference-type">{ref.type}</span>
                  <h3 className="reference-event">{ref.event}</h3>
                  <div className="reference-meta">
                    <span>{ref.year}</span>
                    <span>{ref.location}</span>
                  </div>
                  {ref.quote && (
                    <blockquote className="reference-quote">
                      &ldquo;{ref.quote}&rdquo;
                      <cite>— {ref.client}</cite>
                    </blockquote>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
