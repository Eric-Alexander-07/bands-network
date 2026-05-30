"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { band } from "@/config/band";

function GlassFilter() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter
          id="nav-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 0.9"
            numOctaves="4"
            seed="5"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="luminosity" result="blended" />
          <feComposite in="blended" operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlassFilter />
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
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
          <Link href="/booking" className="nav-cta">
            Buchen
          </Link>
        </div>
      </nav>
    </>
  );
}
