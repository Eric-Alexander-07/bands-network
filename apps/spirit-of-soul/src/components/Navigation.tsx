"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { band } from "@/config/band";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}${mobileOpen ? " nav-open" : ""}`}>
        <div className="nav-glass-bg" />
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            {band.name}
          </Link>
          <ul className="nav-links">
            {band.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <Link href="/booking" className="nav-cta">
              Booking
            </Link>
            <button
              className="nav-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                  <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        {band.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/booking" className="btn btn-gold nav-mobile-cta">
          Booking
        </Link>
      </div>
    </>
  );
}
