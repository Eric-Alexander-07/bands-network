import { band } from "@/config/band";

export default function VideoSection() {
  return (
    <section className="section video-section">
      <div className="container">
        <span className="eyebrow">Live &amp; Studio</span>
        <h2 className="section-title">Videos</h2>
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
  );
}
