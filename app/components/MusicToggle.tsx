"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Show button after preloader
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* Hidden audio element — replace src with a real track */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {visible && (
          <motion.button
            id="music-toggle-btn"
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-none shadow-lg"
            style={{
              background: playing
                ? "linear-gradient(135deg, #C9A84C, #9A7B35)"
                : "rgba(44,26,26,0.85)",
              border: "1px solid rgba(201,168,76,0.4)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
          >
            {/* Pulse ring when playing */}
            {playing && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[#C9A84C]/50"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {playing ? (
              /* Pause icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              /* Music note */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
