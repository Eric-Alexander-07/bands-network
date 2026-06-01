import { band } from "@/config/band";

export default function VideoSection() {
  return (
    <section className="section video-section">
      <div className="container">
        <span className="eyebrow" data-animate="fade-up">Live &amp; Studio</span>
        <h2 className="section-title" data-animate="fade-up" data-delay="100">Videos</h2>
        <div className="video-grid" data-animate="stagger">
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
  );
}
