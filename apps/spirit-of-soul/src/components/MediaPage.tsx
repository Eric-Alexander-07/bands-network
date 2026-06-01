import { band } from "@/config/band";

const MONTHS_LONG  = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

function formatDateDay(dateStr: string)   { const [,, d] = dateStr.split("-").map(Number); return String(d).padStart(2,"0"); }
function formatDateMonth(dateStr: string) { const [, m]  = dateStr.split("-").map(Number); return MONTHS_SHORT[m - 1]; }

const PHOTO_COUNT = 9;

export default function MediaPage() {
  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-guitarist.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Termine, Fotos &amp; Videos</span>
          <h1>Media &amp; News</h1>
          <p>Aktuelle Spieltermine, Live-Momente und Neuigkeiten von {band.name}.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow" data-animate="fade-up">Kommende Events</span>
          <h2 className="section-title" data-animate="fade-up" data-delay="100">Spieltermine</h2>
          <div className="dates-list" data-animate="stagger">
            {band.dates.map((d, i) => (
              <div key={i} className="date-row">
                <div className="date-col-date">
                  <span className="date-day">{formatDateDay(d.date)}</span>
                  <span className="date-month">{formatDateMonth(d.date)}</span>
                </div>
                <div className="date-col-info">
                  <p className="date-event">{d.event}</p>
                  <p className="date-venue">{d.venue} · {d.location}</p>
                </div>
                <span className="date-type">{d.type}</span>
                <a href="/booking" className="date-ticket btn btn-outline">Anfragen</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section video-section">
        <div className="container">
          <span className="eyebrow">Videos</span>
          <h2 className="section-title">Ansehen</h2>
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">Fotos</span>
          <h2 className="section-title">Galerie</h2>
          <div className="media-grid" data-animate="stagger">
            {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
              <div key={i} className="media-photo-placeholder" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
