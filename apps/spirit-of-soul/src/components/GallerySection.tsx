import Link from "next/link";
import { band } from "@/config/band";

export default function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="gallery-layout">
          <div className="gallery-text">
            <span className="eyebrow">Impressionen</span>
            <h2 className="section-title">Galerie &amp; Medien</h2>
            <p className="gallery-desc">
              Eindrücke von Auftritten, Studio-Sessions und Events — Fotos und
              Videos aus dem Live-Alltag von {band.name}.
            </p>
            <Link href="/galerie" className="btn btn-light">
              Zur Galerie
            </Link>
          </div>
          <div className="gallery-preview">
            <div className="gallery-preview-photo">
              <span className="gallery-photo-placeholder">Foto</span>
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
