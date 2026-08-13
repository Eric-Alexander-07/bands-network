"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { band } from "@/config/band";
import DotGrid from "@/components/DotGrid";
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
          <DotGrid variant="cluster" origin={{ x: 1, y: 0.5 }} spread={0.85} seed={3} intensity={0.22} />
          <div className="hero-content">
            <p className="hero-eyebrow">{c.hero_eyebrow}</p>
            {/* Das Logo traegt die Headline, wie bei den anderen Bands — kein Textzeilen-Zweizeiler auf der Startseite. */}
            <h1 className="hero-title">
              <img src="/images/logo-light.png" alt={band.name} className="hero-logo" />
            </h1>
            <p className="hero-claim">{c.hero_claim}</p>
            <p className="hero-sub">{c.hero_sub}</p>
            <div className="hero-actions">
              <Link href="/booking" className="btn btn-primary">
                Jetzt anfragen
              </Link>
              <Link href="/about" className="btn btn-outline-light">
                Die Band
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
                  Alle Termine →
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hero-right">
          <div ref={parallaxRef} className="hero-right-inner">
            {c.hero_image ? (
              <picture>
                {/* Auf Smartphones ein hochkantiger Zuschnitt, falls gepflegt. */}
                {c.hero_image_mobile && (
                  <source media="(max-width: 640px)" srcSet={c.hero_image_mobile} />
                )}
                <img
                  src={c.hero_image}
                  alt="Groove Control — Live"
                  className="hero-right-img"
                />
              </picture>
            ) : (
              // Platzhalter, solange kein Hero-Bild gepflegt ist.
              <div className="hero-right-placeholder">
                <img src="/images/logo-light.png" alt="Groove Control" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
