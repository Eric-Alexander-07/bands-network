"use client";

import { useEffect, useRef } from "react";

/**
 * Dekoratives Punktraster als Hintergrund-Layer (ersetzt die frueheren Ringe).
 *
 * `corner`  — regelmaessiges Raster, das exponentiell zur oberen rechten Ecke
 *             hin heller wird und zur Mitte verschwindet. Ruhig, fuer Sektionen.
 * `cluster` — organische Punktwolke ueber ein Pseudo-Rauschen; Goldpunkte in
 *             den dichten Bereichen, Steel Blue in den duennen. Fuer den Hero.
 *
 * Statisch, ohne Animation. Zeichnet auf Canvas, weil ein Raster dieser Dichte
 * als DOM-Elemente die Seite unnoetig aufblaehen wuerde.
 */
interface Props {
  variant?: "corner" | "cluster";
  /**
   * Ursprung der Wolke bei `cluster`, relativ zur Flaeche (0–1).
   * Standard ist oben rechts; `{ x: 1, y: 0.5 }` laesst sie mittig von
   * rechts hereinlaufen.
   */
  origin?: { x: number; y: number };
  /** Reichweite der Wolke als Anteil der Breite. */
  spread?: number;
  /**
   * Verschiebt das Rauschen, sodass zwei Wolken mit gleicher Position
   * trotzdem unterschiedlich gemustert sind.
   */
  seed?: number;
  /**
   * Deckkraft des dichtesten Punktes (0–1). Bewusst niedrig: liegt Text
   * ueber der Flaeche, konkurrieren zu kraeftige Punkte mit der Schrift.
   */
  intensity?: number;
  className?: string;
}

const GOLD = "212,175,106";
const STEEL = "74,90,120";

export default function DotGrid({
  variant = "corner",
  origin = { x: 0.85, y: 0.15 },
  spread = 0.75,
  seed = 0,
  intensity = 0.34,
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

      if (variant === "corner") {
        const spacing = 24;
        const maxDistance = Math.hypot(width, height);
        for (let x = 0; x <= width; x += spacing) {
          for (let y = 0; y <= height; y += spacing) {
            // Abstand zur oberen rechten Ecke
            const distance = Math.hypot(width - x, y);
            const alpha = Math.max(0, (1 - distance / maxDistance) ** 2.2) * intensity;
            if (alpha < 0.02) continue;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${GOLD},${alpha})`;
            ctx.fill();
          }
        }
        return;
      }

      // ── cluster ────────────────────────────────────────────────
      const spacing = 14;
      const originX = width * origin.x;
      const originY = height * origin.y;
      const reach = width * spread;

      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          // `seed` verschiebt die Phasen der drei Sinuswellen gegeneinander,
          // wodurch ein anderes Wolkenmuster entsteht statt nur einer
          // verschobenen Kopie desselben Musters.
          const raw =
            (Math.sin(x * 0.008 + y * 0.011 + seed * 1.7) +
              Math.sin(x * 0.017 - y * 0.006 + seed * 2.9) +
              Math.sin((x + y) * 0.013 + seed * 0.8)) /
            3;
          const n = (raw + 1) / 2; // auf 0–1 normalisieren

          // Quadratischer Abfall statt linear: die Wolke bleibt nah am
          // Ursprung dicht, wird zur Mitte hin aber deutlich schneller duenn —
          // dort steht der Text.
          const distFactor = (1 - Math.min(1, Math.hypot(x - originX, y - originY) / reach)) ** 1.7;
          const alpha = n * distFactor * intensity;
          if (alpha < 0.04) continue;

          ctx.beginPath();
          ctx.arc(x, y, 0.9 + n * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = n > 0.55 ? `rgba(${GOLD},${alpha})` : `rgba(${STEEL},${alpha})`;
          ctx.fill();
        }
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [variant, origin.x, origin.y, spread, seed, intensity]);

  return <canvas ref={ref} className={`dot-grid ${className}`} aria-hidden="true" />;
}
