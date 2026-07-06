import Link from "next/link";
import { band } from "@/config/band";

export default function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="gallery-layout">
          <div className="gallery-text">
            <span className="eyebrow" data-animate="fade-up">Impressionen</span>
            <h2 className="section-title" data-animate="fade-up" data-delay="100">
              Galerie &amp; Medien
            </h2>
            <p className="gallery-desc" data-animate="fade-up" data-delay="200">
              Eindrücke von Auftritten, Studio-Sessions und Events — Fotos und
              Videos aus dem Live-Alltag von {band.name}.
            </p>
            <div data-animate="fade-up" data-delay="300">
              <Link href="/galerie" className="btn btn-light">
                Zur Galerie
              </Link>
            </div>
          </div>
          <div className="gallery-preview" data-animate="fade-left">
            <div className="gallery-preview-photo">
              <img src="/images/live-main.webp" alt="WE ROCK Live" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="gallery-preview-video video-item">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${band.videos[0].id}`}
                title={band.videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
