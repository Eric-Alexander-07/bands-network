import Link from "next/link";
import { band } from "@/config/band";
import PhotoCarousel from "@/components/PhotoCarousel";

export default function OccasionsSection() {
  return (
    <section className="section occasions-section">
      <div className="container">
        <div className="occasions-layout">
          <PhotoCarousel photos={band.photos} />
          <div className="occasions-text">
            <span className="eyebrow">Wir spielen bei</span>
            <h2 className="section-title">Jedem Anlass</h2>
            <p className="occasions-desc">
              Ob Hochzeit, Firmen-Event, Stadtfest oder exklusive Feier —{" "}
              {band.name} passt sich jedem Rahmen an und sorgt für den richtigen
              Sound zur richtigen Zeit.
            </p>
            <div className="occasions-chips">
              {band.occasions.map((occasion, i) => (
                <span key={i} className="occasion-chip">
                  <span className="occasion-chip-icon">{occasion.icon}</span>
                  {occasion.title}
                </span>
              ))}
            </div>
            <Link href="/services" className="btn btn-primary">
              Unsere Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
