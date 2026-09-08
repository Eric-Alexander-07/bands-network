"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: string;
  title: string;
  description?: string;
}

export default function VideoPlaylistPlayer({ videos }: { videos: Video[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const active = videos[activeIdx];
  const embedSrc = `https://www.youtube-nocookie.com/embed/${active.id}${autoplay ? "?autoplay=1" : ""}`;

  function select(idx: number) {
    setActiveIdx(idx);
    setExpanded(true);
    setAutoplay(true);
  }

  return (
    <div className="vpp">
      {/* Player — expands when a video is selected */}
      <motion.div
        className="vpp-player"
        layout
        animate={{ height: expanded ? "auto" : undefined }}
        transition={{ layout: { duration: 0.42, ease: [0.32, 0, 0.67, 0] } }}
      >
        {/* Click overlay when compact — first click expands */}
        {!expanded && (
          <div
            className="vpp-overlay"
            onClick={() => { setExpanded(true); setAutoplay(true); }}
          >
            <span className="vpp-play-icon">▶</span>
            <span className="vpp-play-label">{active.title}</span>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="vpp-iframe-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <iframe
              src={embedSrc}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Active video meta */}
      {expanded && active.description && (
        <motion.p
          className="vpp-desc"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {active.description}
        </motion.p>
      )}

      {/* Playlist */}
      <div className="vpp-list-wrap">
        <p className="vpp-list-label">
          Videos &amp; Hörproben
          <span className="vpp-list-count"> ({videos.length})</span>
        </p>
        <div className="vpp-list">
          {videos.map((v, i) => (
            <button
              key={i}
              className={`vpp-item${i === activeIdx ? " vpp-item--active" : ""}`}
              onClick={() => select(i)}
            >
              <span className="vpp-item-icon">{i === activeIdx && expanded ? "▶" : "▷"}</span>
              <span className="vpp-item-title">{v.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
