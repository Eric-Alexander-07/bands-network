import { band } from "@/config/band";

const galleryImages = [
  { src: "/images/about.webp",                        alt: "Spirit of Soul — Full Band" },
  { src: "/images/gallery/live-guitarist.webp",       alt: "Gitarrist auf der Bühne" },
  { src: "/images/gallery/live-vocalist-gold.webp",   alt: "Vocalist im Gold-Jacket" },
  { src: "/images/gallery/live-stage-duo.webp",       alt: "Sänger und Gitarrist" },
  { src: "/images/gallery/live-festival-singer.webp", alt: "Festival Performance" },
  { src: "/images/gallery/live-vocalist-hat.webp",    alt: "Lead Vocalist" },
  { src: "/images/hero.webp",                         alt: "Sängerin — Live Performance" },
];

export default function GalleriePage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-stage-duo.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Fotos &amp; Videos</span>
          <h1>Galerie</h1>
          <p>Eindrücke von unseren Live-Auftritten, Studio-Sessions und Events.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Fotos</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Live-Impressionen</h2>
          <div className="gallery-grid" data-animate="stagger">
            {galleryImages.map((photo, i) => (
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
          <div className="video-grid" data-animate="stagger">
            {band.videos.map((video, i) => (
              <div key={`${video.id}-${i}`} className="video-item">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
