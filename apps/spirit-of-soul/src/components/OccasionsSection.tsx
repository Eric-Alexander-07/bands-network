import Link from "next/link";
import { band } from "@/config/band";
import PhotoCarousel from "@/components/PhotoCarousel";
import ConcentricRings from "@/components/ConcentricRings";

export default function OccasionsSection() {
  return (
    <section className="section occasions-section section-has-rings">
      <ConcentricRings id="occasions-s" className="rings-left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="occasions-layout">
          <div data-animate="fade-right">
            <PhotoCarousel photos={band.photos} />
          </div>
          <div className="occasions-text">
            <span className="eyebrow" data-animate="fade-up">Wir spielen bei</span>
            <h2 className="section-title" data-animate="fade-up" data-delay="100">Jedem Anlass</h2>
            <p className="occasions-desc" data-animate="fade-up" data-delay="200">
              Ob Hochzeit, Firmen-Event, Stadtfest oder exklusive Feier —{" "}
              {band.name} passt sich jedem Rahmen an und sorgt für den richtigen
              Sound zur richtigen Zeit.
            </p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/services" className="btn btn-primary">
                Unsere Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
