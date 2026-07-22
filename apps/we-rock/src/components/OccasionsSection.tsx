import Link from "next/link";
import PhotoCarousel from "@/components/PhotoCarousel";
import ConcentricRings from "@/components/ConcentricRings";

const TRIBUTE_PHOTOS = [
  { src: "/images/tribute-1.webp", alt: "WE ROCK – Tribute Show live" },
  { src: "/images/tribute-2.webp", alt: "WE ROCK – Tribute Show live" },
  { src: "/images/tribute-3.webp", alt: "WE ROCK – Tribute Show live" },
];

export default function OccasionsSection() {
  return (
    <section className="section occasions-section section-has-rings">
      <ConcentricRings className="rings-left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="occasions-layout">
          <div data-animate="fade-right">
            <PhotoCarousel photos={TRIBUTE_PHOTOS} />
          </div>
          <div className="occasions-text">
            <span className="eyebrow" data-animate="fade-up">Die Bühne gehört Euch – der Sound gehört uns!</span>
            <h2 className="section-title" data-animate="fade-up" data-delay="100">Bucht uns für Euren Rock-Tribute Event</h2>
            <p className="occasions-desc" data-animate="fade-up" data-delay="200">
              Egal ob Club-Gig, Stadtfest, großes Tribute-Festival oder Ihr exklusives Firmen- und Privatevent: We Rock passt sich jedem Rahmen flexibel an. Mit maßgeschneiderter Besetzung und flexiblem Sound-Setup liefern wir genau die richtige Energie zur richtigen Zeit. Wir bringen Eure Location zum Kochen und garantieren ein unvergessliches Live-Erlebnis!
            </p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/services" className="btn btn-primary">
                Unser Programm & Besetzung
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
