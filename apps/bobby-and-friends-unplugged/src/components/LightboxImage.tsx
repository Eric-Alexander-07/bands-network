"use client";

import { useState, useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  overlayContent?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function LightboxImage({
  src,
  alt,
  className = "",
  wrapperClassName,
  overlayContent,
  style,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );

  if (wrapperClassName) {
    return (
      <>
        <div
          className={`${wrapperClassName} lb-cursor`}
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          aria-label={`${alt} vergrößern`}
        >
          {img}
          {overlayContent && (
            <div className="lb-hover-overlay">{overlayContent}</div>
          )}
        </div>
        {open && <LightboxModal src={src} alt={alt} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="lb-cursor" onClick={() => setOpen(true)} style={{ display: "contents" }}>
        {img}
      </div>
      {open && <LightboxModal src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

function LightboxModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Schließen">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
