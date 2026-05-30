import Link from "next/link";
import { band } from "@/config/band";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-split">
        <div className="hero-left">
          <div className="hero-content">
            <p className="hero-eyebrow">
              {band.genre} · {band.location} · Seit 2000
            </p>
            <h1 className="hero-title">
              <span className="hero-title-line">Spirit</span>
              <span className="hero-title-line hero-title-italic">of Soul</span>
            </h1>
            <p className="hero-claim">{band.claim}</p>
            <p className="hero-sub">{band.tagline} — 25 Jahre Live-Erfahrung auf internationalen Bühnen.</p>
            <div className="hero-actions">
              <Link href="/booking" className="btn btn-light">
                Jetzt buchen
              </Link>
              <Link href="/about" className="btn btn-outline-light">
                Über uns
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-right-placeholder">
            <span>Band Photo</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom-bar">
        {band.facts.map((fact, i) => (
          <div key={i} className="hero-stat">
            <span className="hero-stat-value">{fact.value}</span>
            <span className="hero-stat-label">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
