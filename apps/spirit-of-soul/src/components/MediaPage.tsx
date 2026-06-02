import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import VideoPlaylistPlayer from "@/components/VideoPlaylistPlayer";
import LightboxImage from "@/components/LightboxImage";

const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

function fmtDay(d: string)   { const [,, day] = d.split("-").map(Number); return String(day).padStart(2, "0"); }
function fmtMonth(d: string) { const [, m]    = d.split("-").map(Number); return MONTHS_SHORT[m - 1]; }
function fmtYear(d: string)  { const [year]   = d.split("-").map(Number); return year; }

const PLATFORMS = [
  { key: "instagram" as const, label: "Instagram", handle: "@bobbystoecker" },
  { key: "facebook"  as const, label: "Facebook",  handle: "Spirit of Soul" },
  { key: "youtube"   as const, label: "YouTube",   handle: "@spiritofsoul" },
];

export default function MediaPage() {
  const [mainVideo, ...playlistVideos] = band.videos;

  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-guitarist.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Termine, News &amp; Videos</span>
          <h1>Media &amp; News</h1>
          <p>Aktuelle Spieltermine, Videos und Social Media von {band.name}.</p>
        </div>
      </section>

      {/* Videos + Spieltermine */}
      <section className="section section-has-rings">
        <ConcentricRings className="rings-far-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="media-main-layout">

            {/* Videos — links */}
            <div className="media-videos-col">
              <span className="eyebrow" data-animate="fade-up">Videos</span>
              <h2 className="section-title" data-animate="fade-up" data-delay="100">Auf der Bühne</h2>

              {/* Featured — fest, immer sichtbar */}
              <div data-animate="fade-up" data-delay="200">
                <div className="media-video-featured">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${mainVideo.id}`}
                    title={mainVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy"
                  />
                </div>
                <div className="media-video-meta">
                  <p className="media-video-title">{mainVideo.title}</p>
                  {mainVideo.description && (
                    <p className="media-video-desc">{mainVideo.description}</p>
                  )}
                </div>
              </div>

              {/* Weitere Videos — Playlist Player */}
              {playlistVideos.length > 0 && (
                <div data-animate="fade-up" data-delay="300">
                  <VideoPlaylistPlayer videos={playlistVideos} />
                </div>
              )}
            </div>

            {/* Spieltermine — rechts */}
            <div className="media-dates-col">
              <span className="eyebrow" data-animate="fade-up">Kommende Events</span>
              <h2 className="section-title" data-animate="fade-up" data-delay="100">Termine</h2>
              <div className="media-dates-list" data-animate="stagger">
                {band.dates.map((d, i) => (
                  <div key={i} className="media-date-item">
                    <div className="media-date-badge">
                      <span className="media-date-day">{fmtDay(d.date)}</span>
                      <span className="media-date-month">{fmtMonth(d.date)}</span>
                      <span className="media-date-year">{fmtYear(d.date)}</span>
                    </div>
                    <div className="media-date-info">
                      <p className="media-date-event">{d.event}</p>
                      <p className="media-date-venue">{d.location}</p>
                      <span className="media-date-type">{d.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section media-social-section">
        <div className="container">
          <div className="media-social-inner">
            {/* Bild links */}
            <div className="media-social-img-col" data-animate="fade-right">
              <LightboxImage
                src="/images/gallery/live-vocalist-gold.webp"
                alt="Spirit of Soul Live"
                className="media-social-img"
                wrapperClassName="media-social-img-lb"
                overlayContent="⊕"
              />
            </div>

            {/* Inhalt rechts */}
            <div className="media-social-content">
              <div data-animate="fade-up">
                <span className="eyebrow">Folgt uns</span>
                <h2 className="section-title">News auf Instagram &amp; Facebook</h2>
                <p className="media-social-desc">
                  Bleibt up to date — neue Auftritte, Fotos, Behind-the-Scenes
                  und direkte Einblicke in unser Bandleben.
                </p>
              </div>
              <div className="media-social-platforms" data-animate="stagger">
                {PLATFORMS.map((p) => (
                  <a key={p.key} href={band.socials[p.key]} className="media-platform-link"
                     target="_blank" rel="noopener noreferrer">
                    <span className="media-platform-label">{p.label}</span>
                    <span className="media-platform-handle">{p.handle}</span>
                    <span className="media-platform-arrow">↗</span>
                  </a>
                ))}
              </div>

              {/* Facebook embed — unter den Links */}
              <div className="media-fb-below" data-animate="fade-up">
                <p className="media-fb-label eyebrow">Facebook</p>
                <div className="media-fb-frame media-fb-responsive">
                  <iframe
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent("https://www.facebook.com/spiritofsoulband/")}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                    style={{ border: "none", overflow: "hidden", display: "block", width: "100%", height: "600px" }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Spirit of Soul Facebook"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
