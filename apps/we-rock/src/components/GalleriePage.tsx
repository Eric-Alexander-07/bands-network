import { band } from "@/config/band";

export default function GalleriePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Fotos & Videos</span>
          <h1>Galerie</h1>
          <p>Impressionen von unseren Live-Auftritten und Veranstaltungen.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {band.photos.map((photo, i) => (
              <div key={i} className="gallery-item">
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
