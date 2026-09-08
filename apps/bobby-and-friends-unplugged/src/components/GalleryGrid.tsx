"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface Photo { src: string; alt: string; }

interface Props { images: Photo[]; }

/* Editorial masonry spans (VMP layout). Only col 1–2 / row 1–2 so the
   pattern tiles cleanly on both the 4-col desktop and 2-col mobile grid.
   `grid-auto-flow: dense` (see globals.css) backfills the gaps. */
const SPAN_PATTERN: { col: number; row: number }[] = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
];

export default function GalleryGrid({ images }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const prev  = useCallback(() => setOpenIdx(i => i !== null ? (i - 1 + images.length) % images.length : 0), [images.length]);
  const next  = useCallback(() => setOpenIdx(i => i !== null ? (i + 1) % images.length : 0), [images.length]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, prev, next]);

  return (
    <>
      {/* Grid */}
      <div className="gallery-editorial">
        {images.map((photo, i) => {
          const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
          return (
            <div
              key={i}
              className="gallery-editorial-item"
              style={{ gridColumn: `span ${span.col}`, gridRow: `span ${span.row}` }}
              onClick={() => setOpenIdx(i)}
            >
              <img src={photo.src} alt={photo.alt} />
              <div className="lb-hover-overlay">⊕</div>
            </div>
          );
        })}
      </div>

      {/* Lightbox — portal to document.body so z-index:500 beats nav z-index:100 */}
      {openIdx !== null && createPortal(
        <div
          className="glb-overlay"
          onClick={close}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 50) { delta > 0 ? next() : prev(); }
            touchStartX.current = null;
          }}
        >
          {/* Close */}
          <button className="glb-close" onClick={close} aria-label="Schließen">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          <button className="glb-nav glb-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Vorheriges Bild">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polyline points="11,3 5,9 11,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Main image */}
          <div className="glb-main" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={openIdx}
              src={images[openIdx].src}
              alt={images[openIdx].alt}
              className="glb-img"
            />
          </div>

          {/* Next */}
          <button className="glb-nav glb-nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Nächstes Bild">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polyline points="7,3 13,9 7,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Counter */}
          <div className="glb-counter" onClick={(e) => e.stopPropagation()}>
            {openIdx + 1} / {images.length}
          </div>

          {/* Thumbnail strip */}
          <div className="glb-thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((photo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={photo.src}
                alt={photo.alt}
                className={`glb-thumb${i === openIdx ? " glb-thumb--active" : ""}`}
                onClick={() => setOpenIdx(i)}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
