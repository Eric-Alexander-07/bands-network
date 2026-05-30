"use client";

import { useEffect, useRef, useState, useCallback, type TouchEvent } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 400;
  const maxWidth = 700;
  const minGap = 36;
  const maxGap = 56;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export default function PhotoCarousel({ photos, autoplay = true }: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = photos.length;

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay, count]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handlePrev = useCallback(() => {
    resetTimer();
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const handleNext = useCallback(() => {
    resetTimer();
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return; // ignore small movements
    delta > 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
  }

  function getStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const lift = gap * 0.75;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;

    if (isActive) {
      return {
        zIndex: 3, opacity: 1, pointerEvents: "auto",
        transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
        transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${lift}px) scale(0.84) rotateY(14deg)`,
        transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${lift}px) scale(0.84) rotateY(-14deg)`,
        transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.75s cubic-bezier(.4,2,.3,1)" };
  }

  return (
    <div className="photo-carousel">
      <div
        className="photo-carousel-track"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={photo.src}
            alt={photo.alt}
            className="photo-carousel-img"
            style={getStyle(i)}
          />
        ))}
      </div>
      <div className="photo-carousel-controls">
        <button className="carousel-btn" onClick={handlePrev} aria-label="Vorheriges Foto">
          <FaArrowLeft size={16} />
        </button>
        <span className="carousel-counter">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button className="carousel-btn" onClick={handleNext} aria-label="Nächstes Foto">
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
