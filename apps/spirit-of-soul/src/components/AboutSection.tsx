import Link from "next/link";
import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";

export default function AboutSection() {
  return (
    <section className="section section-has-rings">
      <ConcentricRings className="rings-left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="about-grid">
          <div className="about-image-wrap" data-animate="fade-right">
            <img
              src="/images/about.webp"
              alt="Spirit of Soul — Die Band"
              className="about-img"
            />
          </div>
          <div className="about-text">
            <span className="eyebrow" data-animate="fade-up">Über die Band</span>
            <h2 data-animate="fade-up" data-delay="100">{band.name}</h2>
            <p data-animate="fade-up" data-delay="200">{band.about.bio}</p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/about" className="btn btn-outline">
                Mehr erfahren
              </Link>
            </div>
            <div className="facts-grid" data-animate="stagger">
              {band.facts.map((fact, i) => (
                <div key={i} className="fact-item">
                  <span className="fact-value">{fact.value}</span>
                  <span className="fact-label">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
