import { band } from "@/config/band";

const GALLERY_PHOTOS = [
  ...band.photos,
  ...band.photos,
  ...band.photos,
];

export default function GalleriePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Fotos &amp; Videos</span>
          <h1>Galerie</h1>
          <p>
            Eindrücke von unseren Live-Auftritten, Studio-Sessions und
            Events.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Fotos</span>
          <h2 className="section-title">Live-Impressionen</h2>
          <div className="gallery-grid">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div key={i} className="gallery-item">
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section video-section">
        <div className="container">
          <span className="eyebrow">Videos</span>
          <h2 className="section-title">Auf der Bühne</h2>
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
    </>
  );
}
