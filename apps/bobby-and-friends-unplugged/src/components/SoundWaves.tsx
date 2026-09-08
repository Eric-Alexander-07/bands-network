"use client";

import { useEffect, useRef } from "react";

/**
 * Dekoratives Hintergrund-Layer aus geschwungenen Klanglinien — das
 * Signaturmuster dieser Band, wie Kreise bei Spirit of Soul, das
 * Punktraster bei Groove Control oder die Schlangenhaut bei CoverSnake.
 * Gedacht als visuelle Entsprechung einer schwingenden Gitarrensaite bzw.
 * einer Tonspur: ruhige, handgezeichnet wirkende Linien statt Buehnenlicht.
 *
 * `corner`  — mehrere waagerechte Linien, die zur oberen rechten Ecke hin
 *             lauter (staerker ausschlagend, sichtbarer) werden und zur
 *             Mitte hin verklingen. Fuer ruhige Sektionen.
 * `cluster` — Linien schwingen konzentriert um einen Ursprungspunkt und
 *             klingen mit der Entfernung aus. Fuer den Hero.
 *
 * Statisch, ohne Animation — wie DotGrid bei Groove Control. Canvas statt
 * SVG, weil die Linienzahl je nach Sektionshoehe variiert.
 */
interface Props {
  variant?: "corner" | "cluster";
  /**
   * Ursprung des Ausschlags bei `cluster`, relativ zur Flaeche (0–1).
   * Standard ist oben rechts; `{ x: 1, y: 0.5 }` laesst ihn mittig von
   * rechts hereinlaufen.
   */
  origin?: { x: number; y: number };
  /** Reichweite des Ausklingens als Anteil der Breite. */
  spread?: number;
  /**
   * Verschiebt die Phasen der Wellen, sodass zwei Vorkommen mit gleicher
   * Position trotzdem unterschiedlich schwingen.
   */
  seed?: number;
  /**
   * Deckkraft am lautesten Punkt (0–1). Bewusst niedrig: liegt Text ueber
   * der Flaeche, konkurrieren zu kraeftige Linien mit der Schrift.
   */
  intensity?: number;
  /**
   * Bei `cluster`: laesst die Reichweite je Zeile pseudozufaellig variieren
   * (0 = alle Zeilen gleich weit, wie bisher; 1 = starke Streuung), sodass
   * die Linien schraeg/gezackt statt entlang eines sauberen Kreisbogens
   * enden. Fuer flache, breite Sektionen (Booking-CTA, Footer) gedacht.
   */
  raggedEdge?: number;
  className?: string;
}

const COPPER = "201,138,75";
const WARM = "140,106,82";

// Deterministischer Pseudozufall je Zeile — kein Math.random(), damit das
// Muster bei jedem Redraw (Resize) gleich bleibt.
function rowNoise(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function SoundWaves({
  variant = "corner",
  origin = { x: 0.85, y: 0.15 },
  spread = 0.75,
  seed = 0,
  intensity = 0.34,
  raggedEdge = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const draw = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      // Auf hochaufloesenden Displays scharf zeichnen, aber nicht unbegrenzt —
      // ab Faktor 2 ist kein sichtbarer Gewinn mehr, nur mehr Rechenaufwand.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      if (variant === "corner") {
        const rows = 14;
        const rowGap = height / (rows + 1);
        const maxDistance = Math.hypot(width, height);
        for (let i = 1; i <= rows; i++) {
          const y = rowGap * i;
          // Naehe zur oberen rechten Ecke bestimmt Lautstaerke (Amplitude)
          // und Deckkraft der Zeile.
          const distance = Math.hypot(width * 0.15, y);
          const loudness = Math.max(0, (1 - distance / maxDistance) ** 2.0);
          const amp = 3 + loudness * 16;
          const alpha = loudness * intensity;
          if (alpha < 0.015) continue;

          ctx.beginPath();
          const freq = 0.012 + (i % 3) * 0.004;
          const phase = seed * 1.6 + i * 0.7;
          for (let x = 0; x <= width; x += 4) {
            const wob = Math.sin(x * 0.004 + phase * 0.3) * 0.4 + 0.6; // langsame Huellkurve
            const yy = y + Math.sin(x * freq + phase) * amp * wob;
            if (x === 0) ctx.moveTo(x, yy);
            else ctx.lineTo(x, yy);
          }
          ctx.strokeStyle = `rgba(${i % 2 === 0 ? COPPER : WARM},${alpha})`;
          ctx.stroke();
        }
        return;
      }

      // ── cluster ────────────────────────────────────────────────
      const rows = 16;
      const rowGap = height / (rows + 1);
      const originX = width * origin.x;
      const originY = height * origin.y;
      const reach = width * spread;

      for (let i = 1; i <= rows; i++) {
        const y = rowGap * i;
        ctx.beginPath();
        const freq = 0.01 + (i % 4) * 0.0035;
        const phase = seed * 2.1 + i * 0.9;
        // Je Zeile eine andere Reichweite, sonst enden alle Zeilen entlang
        // desselben Kreisbogens um den Ursprung — mit raggedEdge > 0 wirkt
        // die Kante stattdessen schraeg/ausgefranst.
        const rowReach = raggedEdge > 0
          ? reach * (1 - raggedEdge * 0.55 * rowNoise(i * 7.13 + seed * 3.7))
          : reach;
        let started = false;
        for (let x = 0; x <= width; x += 4) {
          // Entfernung dieses Punkts zum Ursprung — je naeher, desto lauter
          // schwingt die Linie (groessere Amplitude, kraeftigere Farbe).
          const dist = Math.hypot(x - originX, y - originY);
          const distFactor = (1 - Math.min(1, dist / rowReach)) ** 1.6;
          if (distFactor < 0.03) { started = false; continue; }
          const amp = 1.5 + distFactor * 14;
          const yy = y + Math.sin(x * freq + phase) * amp;
          if (!started) { ctx.moveTo(x, yy); started = true; }
          else ctx.lineTo(x, yy);
        }
        const rowAlpha = intensity * (0.4 + 0.6 * (i % 3 === 0 ? 1 : 0.6));
        ctx.strokeStyle = `rgba(${i % 2 === 0 ? COPPER : WARM},${rowAlpha})`;
        ctx.stroke();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [variant, origin.x, origin.y, spread, seed, intensity, raggedEdge]);

  return <canvas ref={ref} className={`sound-waves ${className}`} aria-hidden="true" />;
}
