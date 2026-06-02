"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { band } from "@/config/band";

const MONTHS_SHORT = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

function formatGigDate(dateStr: string) {
  const [, month, day] = dateStr.split("-").map(Number);
  return `${day}. ${MONTHS_SHORT[month - 1]}`;
}

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const nextDates = band.dates.slice(0, 3);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const y = Math.min(window.scrollY * 0.22, 100);
      parallaxRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            opacity="0.35"
          >
            <defs>
              <filter id="spBlur" x="-30%" y="-10%" width="160%" height="120%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              {/* Gradient: bright at lamp tip, fades to base */}
              <linearGradient id="sg1" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg2" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg3" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.45"/>
                <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg4" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.38"/>
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="sg5" gradientUnits="objectBoundingBox" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Spotlight 1 — violet, from top-left, angled hard right */}
            <polygon points="60,0 100,0 780,1000 -200,1000" fill="url(#sg1)" filter="url(#spBlur)" />

            {/* Spotlight 2 — blue, from top center-left, slight right lean */}
            <polygon points="310,0 345,0 620,1000 80,1000" fill="url(#sg2)" filter="url(#spBlur)" />

            {/* Spotlight 3 — orange, from top center, angled left */}
            <polygon points="510,0 545,0 160,1000 -120,1000" fill="url(#sg3)" filter="url(#spBlur)" />

            {/* Spotlight 4 — pink, from top right, steep left angle */}
            <polygon points="700,0 730,0 200,1000 -80,1000" fill="url(#sg4)" filter="url(#spBlur)" />

            {/* Spotlight 5 — light blue narrow, from top far right, near vertical */}
            <polygon points="790,0 820,0 550,1000 400,1000" fill="url(#sg5)" filter="url(#spBlur)" />
          </svg>

          <div className="hero-content">
            <p className="hero-eyebrow">
              {band.genre} · {band.location} · Seit 2000
            </p>
            <h1 className="hero-title">
              <span className="hero-title-line">Spirit</span>
              <span className="hero-title-line hero-title-italic">of Soul</span>
            </h1>
            <p className="hero-claim">{band.claim}</p>
            <p className="hero-sub">
              {band.tagline} — 25 Jahre Live-Erfahrung auf internationalen Bühnen.
            </p>
            <div className="hero-actions">
              <Link href="/booking" className="btn btn-light">
                Jetzt buchen
              </Link>
              <Link href="/about" className="btn btn-outline-light">
                Über uns
              </Link>
            </div>

            {nextDates.length > 0 && (
              <div className="hero-dates">
                <span className="hero-dates-label">Nächste Auftritte</span>
                <ul className="hero-date-list">
                  {nextDates.map((d, i) => (
                    <li key={i} className="hero-date-item">
                      <span className="hero-date-day">{formatGigDate(d.date)}</span>
                      <span className="hero-date-sep" />
                      <span className="hero-date-event">{d.event}</span>
                      <span className="hero-date-loc">{d.location}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/media" className="hero-dates-more">
                  Alle Termine ansehen →
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hero-right">
          <div ref={parallaxRef} className="hero-right-inner">
            <img
              src="/images/hero.webp"
              alt="Spirit of Soul — Live Performance"
              className="hero-right-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
