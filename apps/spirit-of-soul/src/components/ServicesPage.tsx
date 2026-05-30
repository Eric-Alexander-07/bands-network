import Link from "next/link";
import { band } from "@/config/band";

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Was wir anbieten</span>
          <h1>Services</h1>
          <p>
            Vom intimen Dinner bis zur 12-köpfigen Full-Band — {band.name}{" "}
            bringt die passende Musik für jeden Anlass.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {band.services.map((service, i) => (
              <div key={i} className="service-card">
                <span className="service-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, j) => (
                    <li key={j} className="service-feature">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-cta">
        <div className="container booking-cta-inner">
          <span className="eyebrow">Individuelles Angebot</span>
          <h2>Interesse?</h2>
          <p>
            Nicht das Richtige dabei? Wir erstellen gerne ein
            maßgeschneidertes Angebot für Ihre Veranstaltung.
          </p>
          <div className="booking-cta-actions">
            <Link href="/booking" className="btn btn-gold">
              Anfrage senden
            </Link>
            <a href={`mailto:${band.email}`} className="btn btn-outline-light">
              {band.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
