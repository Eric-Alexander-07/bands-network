import Link from "next/link";
import { band } from "@/config/band";

export default function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="gallery-layout">
          <div className="gallery-text">
            <span className="eyebrow">Fotos & Videos</span>
            <h2 className="section-title">Galerie & Medien</h2>
            <p className="gallery-desc">
              Eindrücke von Auftritten, Studio-Sessions und Events — Fotos und
              Videos aus dem Live-Alltag von {band.name}.
            </p>
            <Link href="/media" className="btn btn-primary">
              Mehr erfahren
            </Link>
          </div>
          <div className="gallery-preview">
            <div className="gallery-preview-photo gallery-photo-placeholder">
              <span className="gallery-photo-label">FOTO</span>
            </div>
            <div className="gallery-preview-video video-item">
              <iframe
                src={`https://www.youtube.com/embed/${band.videos[0].id}`}
                title={band.videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
