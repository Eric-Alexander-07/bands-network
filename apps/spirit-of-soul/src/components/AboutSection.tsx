import Link from "next/link";
import { band } from "@/config/band";

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap">
            <div className="about-image-placeholder" />
          </div>
          <div className="about-text">
            <span className="eyebrow">Über die Band</span>
            <h2>{band.name}</h2>
            <p>{band.about.bio}</p>
            <Link href="/about" className="btn btn-outline">
              Mehr erfahren
            </Link>
            <div className="facts-grid">
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
