import Link from "next/link";
import { band } from "@/config/band";

export default function AboutPage() {

  return (
    <>
      <section className="page-hero">
        <img src="/images/about.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Unsere Geschichte</span>
          <h1>Über uns</h1>
          <p>{band.about.bio}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Flexibel buchbar</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Besetzung</h2>
          <p className="formations-intro" data-animate="fade-up" data-delay="200">
            {band.name} ist für verschiedene Events in verschiedenen
            Besetzungen buchbar — von der eleganten kleinen Formation bis
            zur 12-köpfigen Full-Band mit Bläser Sektion.
          </p>
          <div className="formations-grid" data-animate="stagger">
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
          <div className="formations-cta" data-animate="fade-up">
            <Link href="/booking" className="btn btn-primary">
              Besetzung anfragen
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
