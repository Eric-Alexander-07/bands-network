import Link from "next/link";
import { band } from "@/config/band";

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-vocalist-gold.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>Services</h1>
          <p>
            Vom intimen Dinner bis zur 12-köpfigen Full-Band mit
            Multimedia-Show — {band.name} bringt die passende Musik
            und Technik für jeden Anlass.
          </p>
        </div>
      </section>

      {/* Die Band */}
      <section className="section">
        <div className="container">
          <div className="services-band-intro">
            <div className="services-band-text" data-animate="fade-right">
              <span className="eyebrow">Die Band</span>
              <h2 className="section-title">{band.name}</h2>
              <p>{band.about.bio}</p>
              <p style={{ marginTop: "16px", color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: "1.8" }}>
                Die Stärke von Spirit of Soul liegt in der Musikalität und Spontanität der
                einzelnen Bandmitglieder sowie dem erstklassigen Entertainment der Frontleute.
                Die Programmreihenfolge kann kurzfristig auf der Bühne entschieden werden —
                so ist die Band in der Lage, spontan das richtige Programm für Ihr Event
                maßzuschneidern und das Publikum ab dem ersten Ton zum Mitmachen zu bewegen.
              </p>
            </div>
            <div className="services-band-shows" data-animate="fade-left">
              <span className="eyebrow">Show-Varianten</span>
              <ul className="services-show-list">
                {band.about.shows.map((show, i) => (
                  <li key={i} className="services-show-item">
                    <span className="services-show-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{show}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Leistungen</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Unsere Pakete</h2>
          <div className="services-grid" data-animate="stagger">
            {band.services.map((service, i) => (
              <div key={i} className="service-card">
                <span className="service-number">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, j) => (
                    <li key={j} className="service-feature">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technik */}
      <section className="section technik-section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Ton · Licht · Bühne</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Technik</h2>
          <p className="technik-intro" data-animate="fade-up" data-delay="200">
            {band.technik.intro}
          </p>
          <div className="technik-grid" data-animate="stagger">
            {band.technik.packages.map((pkg, i) => (
              <div key={i} className="technik-card">
                <span className="technik-number">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="technik-name">{pkg.name}</h3>
                <p className="technik-desc">{pkg.description}</p>
                <ul className="service-features">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="service-feature">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="technik-note" data-animate="fade-up">
            {band.technik.note}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Individuelles Angebot</span>
          <h2>Interesse?</h2>
          <p>
            Wir erstellen gerne ein maßgeschneidertes Angebot
            für Ihre Veranstaltung — inkl. Band, Bühne und Technik.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">Anfrage senden</Link>
            <a href={`mailto:${band.email}`} className="btn btn-outline-light">{band.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
