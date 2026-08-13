"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { band } from "@/config/band";
import type { Event } from "@/lib/data";
import type { Content } from "@/lib/content";

function formatGigDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

interface Props {
  /** Events from Supabase DB. Empty array = hide dates section entirely. */
  dbEvents?: Event[];
  /** Seitentexte: Datenbankwert mit Rueckfall auf den Schema-Standard. */
  c: Content;
}

export default function HeroSection({ dbEvents = [], c }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Nur sichtbare Termine ab heute, chronologisch aufsteigend, max. 3 —
  // vergangene Termine waeren im Hero-Teaser nur verwirrend.
  const todayStr = new Date().toISOString().slice(0, 10);
  const nextDates = dbEvents
    .filter(e => e.visible && e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  useEffect(() => {
    // Parallax only on the desktop split layout. On the collapsed mobile/tablet
    // hero the image sits flush (no overscan), so translating it would reveal a
    // gap — keep it static there.
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => {
      if (!parallaxRef.current) return;
      if (mq.matches) {
        parallaxRef.current.style.transform = "";
        return;
      }
      const y = Math.min(window.scrollY * 0.22, 100);
      parallaxRef.current.style.transform = `translateY(${y}px) translateZ(0)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-split">
        <div className="hero-left">
          {/* SVG Scheinwerfer */}
          <svg
            className="hero-spotlights"
            viewBox="0 0 860 1000"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            opacity="0.4"
          >
            <defs>
              <filter id="spBlur" x="-30%" y="-10%" width="160%" height="120%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <linearGradient id="sg1" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#C8151A" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#C8151A" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg2" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#E84118" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#E84118" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg3" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#8b0f13" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#8b0f13" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg4" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#C8151A" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#C8151A" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg5" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#E84118" stopOpacity="0.28"/>
                <stop offset="100%" stopColor="#E84118" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polygon points="60,0 100,0 780,1000 -200,1000" fill="url(#sg1)" filter="url(#spBlur)" />
            <polygon points="310,0 345,0 620,1000 80,1000" fill="url(#sg2)" filter="url(#spBlur)" />
            <polygon points="510,0 545,0 160,1000 -120,1000" fill="url(#sg3)" filter="url(#spBlur)" />
            <polygon points="700,0 730,0 200,1000 -80,1000" fill="url(#sg4)" filter="url(#spBlur)" />
            <polygon points="790,0 820,0 550,1000 400,1000" fill="url(#sg5)" filter="url(#spBlur)" />
          </svg>

          <div className="hero-content">
            <p className="hero-eyebrow">
              Classic Rock / Melodic Rock / Hard &amp; Heavy Rock
            </p>
            <h1 className="hero-title">
              <img
                src="/images/logo_tansparent.png"
                alt="WE ROCK"
                className="hero-logo"
              />
            </h1>
            <p className="hero-claim">{c.hero_claim}</p>
            <p className="hero-sub">{c.hero_sub}</p>
            <div className="hero-actions">
              <Link href="/booking" className="btn btn-primary">
                Jetzt buchen
              </Link>
              <Link href="/about" className="btn btn-outline-light">
                Über uns
              </Link>
            </div>

            {/* Only show dates section if DB has visible events */}
            {nextDates.length > 0 && (
              <div className="hero-dates">
                <span className="hero-dates-label">{c.hero_dates_label}</span>
                <ul className="hero-date-list">
                  {nextDates.map((d, i) => (
                    <li key={d.id ?? i} className="hero-date-item">
                      <span className="hero-date-day">{formatGigDate(d.date)}</span>
                      <span className="hero-date-sep" />
                      {d.link ? (
                        <a href={d.link} className="hero-date-event hero-date-event--link" target="_blank" rel="noopener noreferrer">
                          {d.name}
                        </a>
                      ) : (
                        <span className="hero-date-event">{d.name}</span>
                      )}
                      <span className="hero-date-loc">{d.location}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/media" className="hero-dates-more">
                  Alle öffentlichen Termine →
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hero-right">
          <div ref={parallaxRef} className="hero-right-inner">
            <picture>
              {/* Phones: taller portrait crop so the two singers stay large and
                  clearly framed instead of being cropped small by the square. */}
              <source
                media="(max-width: 640px)"
                srcSet={c.hero_image_mobile}
              />
              <img
                src={c.hero_image}
                alt="WE ROCK — Live Performance"
                className="hero-right-img"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
