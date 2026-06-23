import { band } from "@/config/band";
import ConcentricRings from "@/components/ConcentricRings";
import VideoPlaylistPlayer from "@/components/VideoPlaylistPlayer";
import LightboxImage from "@/components/LightboxImage";
import type { Event, MediaVideo, SocialLink } from "@/lib/data";

const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

function fmtDay(d: string)   { const [,, day] = d.split("-").map(Number); return String(day).padStart(2, "0"); }
function fmtMonth(d: string) { const [, m]    = d.split("-").map(Number); return MONTHS_SHORT[m - 1].toUpperCase(); }
function fmtYear(d: string)  { const [year]   = d.split("-").map(Number); return year; }

const PLATFORMS = [
  { key: "instagram" as const, label: "Instagram", handle: "@bobbystoecker" },
  { key: "facebook"  as const, label: "Facebook",  handle: "Spirit of Soul" },
  { key: "youtube"   as const, label: "YouTube",   handle: "@spiritofsoul" },
];

function getYtId(input: string): string {
  const m = input?.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? input;
}

interface Props { dbEvents?: Event[]; dbVideos?: MediaVideo[]; content?: Record<string, string>; socialLinks?: SocialLink[]; }

export default function MediaPage({ dbEvents = [], dbVideos, content = {}, socialLinks = [] }: Props) {
  const socialMap: Record<string, string> = {};
  socialLinks.forEach(l => { if (l.url) socialMap[l.platform] = l.url; });
  const rawVideos = dbVideos && dbVideos.length > 0 ? dbVideos : null;
  const videos = rawVideos
    ? rawVideos.map(v => ({ id: getYtId(v.youtube_url), title: v.title ?? "" }))
    : band.videos.map(v => ({ id: v.id, title: v.title ?? "" }));
  const [mainVideo, ...playlistVideos] = videos;
  const showEvents = dbEvents.filter(e => e.visible);

  return (
    <>
      <section className="page-hero">
        <img src="/images/gallery/live-guitarist.webp" className="page-hero-bg-img" alt="" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Termine, News &amp; Videos</span>
          <h1>Media &amp; News</h1>
          <p>{content.text_top || `Aktuelle Spieltermine, Videos und Social Media von ${band.name}.`}</p>
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
                {mainVideo.title && (
                  <div className="media-video-meta">
                    <p className="media-video-title">{mainVideo.title}</p>
                  </div>
                )}
                {content.video_text && (
                  <p className="media-video-desc">{content.video_text}</p>
                )}
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
              {showEvents.length > 0 && (
                <>
                  <span className="eyebrow" data-animate="fade-up">Öffentliche Auftritte</span>
                  <h2 className="section-title" data-animate="fade-up" data-delay="100">Öffentliche Termine</h2>
                  <div className="media-dates-list" data-animate="stagger">
                    {showEvents.map((d) => {
                      const inner = (
                        <>
                          <div className="media-date-badge">
                            <span className="media-date-day">{fmtDay(d.date)}</span>
                            <span className="media-date-month">{fmtMonth(d.date)}</span>
                            <span className="media-date-year">{fmtYear(d.date)}</span>
                          </div>
                          <div className="media-date-info">
                            <p className="media-date-event">{d.name}</p>
                            <p className="media-date-venue">{d.location}</p>
                            {d.link && <span className="media-date-link">Tickets / Info ↗</span>}
                          </div>
                        </>
                      );
                      return d.link ? (
                        <a key={d.id} href={d.link} className="media-date-item media-date-item--link"
                           target="_blank" rel="noopener noreferrer">{inner}</a>
                      ) : (
                        <div key={d.id} className="media-date-item">{inner}</div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Facebook Page Plugin */}
              <div className="media-fb-inline" data-animate="fade-up">
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(socialMap.facebook || band.socials.facebook)}&tabs=timeline&width=400&height=2000&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                  style={{ border: "none", overflow: "hidden", display: "block", width: "100%" }}
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Spirit of Soul Facebook"
                />
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
                src={content.image_main || "/images/gallery/live-vocalist-gold.webp"}
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
                  <a key={p.key} href={socialMap[p.key] || band.socials[p.key]} className="media-platform-link"
                     target="_blank" rel="noopener noreferrer">
                    <span className="media-platform-label">{p.label}</span>
                    <span className="media-platform-handle">{p.handle}</span>
                    <span className="media-platform-arrow">↗</span>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
