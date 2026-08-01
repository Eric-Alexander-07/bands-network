import { band } from "@/config/band";
import DotGrid from "@/components/DotGrid";
import VideoPlaylistPlayer from "@/components/VideoPlaylistPlayer";
import LightboxImage from "@/components/LightboxImage";
import type { Event, MediaVideo, SocialLink } from "@/lib/data";
import type { Content } from "@/lib/content";

function fmtDayMonth(d: string) { const [, m, day] = d.split("-").map(Number); return `${String(day).padStart(2, "0")}.${String(m).padStart(2, "0")}.`; }
function fmtYear(d: string)     { const [year]      = d.split("-").map(Number); return year; }

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
  tiktok: "TikTok",
};

/** Aus einer Profil-URL den anzeigbaren Namen ableiten (z. B. @groovecontrol_band). */
function handleFromUrl(url: string): string {
  const last = url.replace(/\/+$/, "").split("/").pop() ?? "";
  return last.startsWith("@") ? last : `@${last}`;
}

function getYtId(input: string): string {
  const m = input?.match(/(?:v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? input;
}

interface Props { dbEvents?: Event[]; dbVideos?: MediaVideo[]; c: Content; socialLinks?: SocialLink[]; }

export default function MediaPage({ dbEvents = [], dbVideos, c, socialLinks = [] }: Props) {
  // Profile aus der Datenbank haben Vorrang; `band.socials` ist nur Rueckfall.
  const socialMap: Record<string, string> = { ...band.socials };
  socialLinks.forEach(l => { if (l.url) socialMap[l.platform] = l.url; });

  const platforms = Object.entries(socialMap)
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => ({ key, url, label: PLATFORM_LABELS[key] ?? key }));

  const facebookUrl = socialMap.facebook;
  const rawVideos = dbVideos && dbVideos.length > 0 ? dbVideos : null;
  const videos = rawVideos
    ? rawVideos.map(v => ({ id: getYtId(v.youtube_url), title: v.title ?? "" }))
    : band.videos.map(v => ({ id: v.id, title: v.title ?? "" }));
  // `mainVideo` kann fehlen, solange keine Videos gepflegt sind.
  const mainVideo = videos[0];
  const playlistVideos = videos.slice(1);
  const showEvents = dbEvents.filter(e => e.visible);

  return (
    <>
      <section className="page-hero">
        <img src={c.page_hero_image} className="page-hero-bg-img" alt="" aria-hidden="true" style={{ objectPosition: "center 25%" }} />
        <div className="container">
          <span className="eyebrow">Termine, News &amp; Videos</span>
          <h1>{c.page_hero_title}</h1>
          <p>{c.text_top}</p>
        </div>
      </section>

      {/* Videos + Spieltermine */}
      <section className="section section-has-rings">
        <DotGrid variant="corner" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="media-main-layout">

            {/* Videos — links. Der ganze Block entfaellt, solange keine
                Videos gepflegt sind (sonst liefe das Haupt-Embed ins Leere). */}
            <div className="media-videos-col">
              {mainVideo && (
                <>
                  <span className="eyebrow" data-animate="fade-up">Videos</span>
                  <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.videos_title}</h2>

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
                    {c.video_text && (
                      <p className="media-video-desc">{c.video_text}</p>
                    )}
                  </div>
                </>
              )}

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
                  <h2 className="section-title" data-animate="fade-up" data-delay="100">{c.events_title}</h2>
                  <div className="media-dates-list" data-animate="stagger">
                    {showEvents.map((d) => {
                      const inner = (
                        <>
                          <div className="media-date-badge">
                            <span className="media-date-day">{fmtDayMonth(d.date)}</span>
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
                src={c.image_main}
                alt="Groove Control Live"
                className="media-social-img"
                wrapperClassName="media-social-img-lb"
                overlayContent="⊕"
              />
            </div>

            {/* Inhalt rechts */}
            <div className="media-social-content">
              <div data-animate="fade-up">
                <span className="eyebrow">Folgt uns</span>
                <h2 className="section-title">{c.social_title}</h2>
                <p className="media-social-desc">
                  {c.social_text}
                </p>
              </div>
              <div className="media-social-platforms" data-animate="stagger">
                {platforms.map((p) => (
                  <a key={p.key} href={p.url} className="media-platform-link"
                     target="_blank" rel="noopener noreferrer">
                    <span className="media-platform-label">{p.label}</span>
                    <span className="media-platform-handle">{handleFromUrl(p.url)}</span>
                    <span className="media-platform-arrow">↗</span>
                  </a>
                ))}
              </div>

              {/* Das Facebook-Page-Plugin erscheint nur, wenn eine Facebook-Seite
                  gepflegt ist — Groove Control hat bisher keine. */}
              {facebookUrl && (
                <div className="media-fb-inline" data-animate="fade-up">
                  <iframe
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookUrl)}&tabs=timeline&width=400&height=2000&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                    style={{ border: "none", overflow: "hidden", display: "block", width: "100%" }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Groove Control auf Facebook"
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
