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
