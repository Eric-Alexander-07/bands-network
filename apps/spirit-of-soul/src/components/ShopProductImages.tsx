"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const LABELS = ["Vorderseite", "Rückseite"];

interface Props {
  images: string[];
  name: string;
}

export default function ShopProductImages({ images, name }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: idx * scrollRef.current.clientWidth, behavior: "smooth" });
  }, []);

  function onScroll() {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    setCurrent(idx);
  }

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="shop-img-wrap">
        {/* Scroll container */}
        <div className="shop-img-scroller" ref={scrollRef} onScroll={onScroll}>
          {images.map((src, i) => (
            <div key={i} className="shop-img-slide">
              <img src={src} alt={`${name} — ${LABELS[i] ?? i + 1}`} />
              <button
                className="shop-img-zoom"
                onClick={() => setLightbox(src)}
                aria-label="Vergrößern"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                  <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="8" y1="6" x2="8" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Tab-style controls */}
        <div className="shop-img-controls">
          {images.map((_, i) => (
            <button
              key={i}
              className={`shop-img-ctrl${current === i ? " active" : ""}`}
              onClick={() => scrollTo(i)}
            >
              {LABELS[i] ?? `Bild ${i + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="shop-lightbox" onClick={() => setLightbox(null)}>
          <button className="shop-lightbox-close" onClick={() => setLightbox(null)} aria-label="Schließen">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="shop-lightbox-img" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt={name} />
          </div>
        </div>
      )}
    </>
  );
}
