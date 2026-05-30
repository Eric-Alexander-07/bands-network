import { band } from "@/config/band";

const PHOTO_COUNT = 9;

export default function MediaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Fotos &amp; Videos</span>
          <h1>Media &amp; News</h1>
          <p>Live-Momente, Studio-Sessions und Neuigkeiten von {band.name}.</p>
        </div>
      </section>

      <section className="section video-section">
        <div className="container">
          <span className="eyebrow">Videos</span>
          <h2 className="section-title">Ansehen</h2>
          <div className="video-grid">
            {band.videos.map((video, i) => (
              <div key={`${video.id}-${i}`} className="video-item">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">Fotos</span>
          <h2 className="section-title">Galerie</h2>
          <div className="media-grid">
            {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
              <div key={i} className="media-photo-placeholder" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
