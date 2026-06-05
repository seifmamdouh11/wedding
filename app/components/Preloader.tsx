"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  States:
  "waiting"  → envelope sealed, pulsing "click me" hint
  "open"     → flap lifts (0.9s)
  "rise"     → card rises out (starts after open)
  "expand"   → scene blooms + fades
  "done"     → unmounted, hero visible
*/

type Phase = "waiting" | "open" | "rise" | "expand" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("waiting");

  const handleClick = () => {
    if (phase !== "waiting") return;

    setPhase("open");
    setTimeout(() => setPhase("rise"),   950);
    setTimeout(() => setPhase("expand"), 2100);
    setTimeout(() => setPhase("done"),   3100);
  };

  const isOpen   = phase !== "waiting";
  const isRising = ["rise", "expand", "done"].includes(phase);
  const isExpand = phase === "expand" || phase === "done";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at center, #2C1A1A 0%, #1A0F0F 70%)" }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 55%, rgba(201,168,76,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Arabesque grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.3' opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='26'/%3E%3Ccircle cx='30' cy='30' r='18'/%3E%3Cpath d='M30 4 L30 56 M4 30 L56 30 M9.4 9.4 L50.6 50.6 M50.6 9.4 L9.4 50.6'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating gold particles */}
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                background: "#C9A84C",
                left: `${6 + i * 6.5}%`,
                top: `${12 + (i % 6) * 13}%`,
              }}
              animate={{ y: [0, -(18 + (i % 4) * 12), 0], opacity: [0, 0.45 + (i % 3) * 0.12, 0] }}
              transition={{ duration: 3.2 + (i % 3) * 0.9, delay: i * 0.15, repeat: Infinity }}
            />
          ))}

          {/* ── Scene ── */}
          <motion.div
            className="relative flex flex-col items-center"
            style={{ perspective: 1400 }}
            animate={isExpand ? { scale: 1.9, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >

            {/* ════════════════════
                INVITATION CARD
            ════════════════════ */}
            <motion.div
              className="absolute z-20 flex flex-col items-center justify-between px-8 py-7 rounded-2xl"
              style={{
                width: 264,
                height: 330,
                bottom: 86,
                background: "linear-gradient(165deg, #FFFFF0 0%, #FDF6E3 50%, #F5EDD8 100%)",
                border: "1px solid rgba(201,168,76,0.55)",
                boxShadow:
                  "0 0 0 1px rgba(201,168,76,0.1), 0 28px 64px rgba(0,0,0,0.6), 0 4px 20px rgba(201,168,76,0.12)",
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={
                isRising
                  ? { y: -230, opacity: 1 }
                  : isOpen
                  ? { y: 0, opacity: 1 }
                  : { y: 0, opacity: 0 }
              }
              transition={{
                y:       { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35 },
              }}
            >
              {/* Filigree corners */}
              {(["top-2.5 right-2.5", "top-2.5 left-2.5", "bottom-2.5 right-2.5", "bottom-2.5 left-2.5"] as const).map((pos, ci) => (
                <svg
                  key={ci}
                  className={`absolute ${pos} text-[#C9A84C]/40`}
                  width="14" height="14" viewBox="0 0 14 14" fill="currentColor"
                  style={{ transform: ci === 1 ? "scaleX(-1)" : ci === 2 ? "scaleY(-1)" : ci === 3 ? "scale(-1)" : undefined }}
                >
                  <path d="M0 0 L5 0 L0 5 Z" />
                </svg>
              ))}

              {/* Top rule */}
              <div className="w-full flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/45" />
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="#C9A84C">
                    <path d="M5.5 0L6.6 4.4 11 5.5 6.6 6.6 5.5 11 4.4 6.6 0 5.5 4.4 4.4Z" />
                  </svg>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/45" />
                </div>
                <p className="text-[#9A7B35]/80 tracking-[0.5em] uppercase" style={{ fontSize: "8px" }}>
                  Wedding Invitation
                </p>
              </div>

              {/* Names */}
              <div className="flex flex-col items-center gap-0.5 text-center">
                <p className="font-bold text-[#2C1A1A]" style={{ fontSize: "1.9rem", lineHeight: 1.05, letterSpacing: "-0.015em" }}>
                  Layla
                </p>
                <p className="text-[#C9A84C]/60 tracking-[0.35em]" style={{ fontSize: "0.7rem" }}>&amp;</p>
                <p className="font-bold text-[#2C1A1A]" style={{ fontSize: "1.9rem", lineHeight: 1.05, letterSpacing: "-0.015em" }}>
                  Ahmed
                </p>
              </div>

              {/* Middle divider */}
              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 h-px bg-[#C9A84C]/20" />
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1 h-1 rotate-45" style={{ background: `rgba(201,168,76,${0.25 + i * 0.2})` }} />
                  ))}
                </div>
                <div className="flex-1 h-px bg-[#C9A84C]/20" />
              </div>

              {/* Date + location */}
              <div className="flex flex-col items-center gap-1.5 text-center">
                <p className="text-[#4A2828] font-semibold" style={{ fontSize: "0.8rem", letterSpacing: "0.08em" }}>
                  السبت — ١٥ مارس ٢٠٢٦
                </p>
                <p className="text-[#9A7B35]/70 tracking-wider" style={{ fontSize: "0.65rem" }}>
                  Al-Amira Palace, Riyadh
                </p>
              </div>

              {/* Bottom rule */}
              <div className="w-full flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/45" />
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="#C9A84C">
                    <path d="M5.5 0L6.6 4.4 11 5.5 6.6 6.6 5.5 11 4.4 6.6 0 5.5 4.4 4.4Z" />
                  </svg>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/45" />
                </div>
              </div>
            </motion.div>

            {/* ════════════════════
                ENVELOPE (clickable)
            ════════════════════ */}
            <motion.div
              className="relative"
              style={{ width: 320, height: 220 }}
              /* Idle float */
              animate={phase === "waiting" ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Hover glow ring — only in waiting state */}
              {phase === "waiting" && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 30px rgba(201,168,76,0.22)", "0 0 0px rgba(201,168,76,0)"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* SVG envelope body */}
              <svg
                viewBox="0 0 320 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.65))" }}
              >
                {/* Body */}
                <rect x="0" y="50" width="320" height="170" rx="12" fill="#F5EDD8" />
                {/* Side folds */}
                <path d="M0 62 L0 218 L160 148 Z" fill="#EDD9B0" />
                <path d="M320 62 L320 218 L160 148 Z" fill="#E4CDA0" />
                {/* Bottom fold */}
                <path d="M0 220 L160 148 L320 220 Z" fill="#F0E4C8" />
                {/* Inner crease lines */}
                <path d="M14 218 L160 153 L306 218" stroke="rgba(201,168,76,0.18)" strokeWidth="1" fill="none" />
                {/* Outer gold border */}
                <rect x="0.75" y="50.75" width="318.5" height="168.5" rx="11.25" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                {/* Inner gold border */}
                <rect x="8" y="58" width="304" height="153" rx="8" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none" />
              </svg>

              {/* ── WAX SEAL ── */}
              <motion.div
                className="absolute z-10 flex items-center justify-center rounded-full"
                style={{
                  width: 50, height: 50,
                  bottom: 68, left: "50%",
                  translateX: "-50%",
                  background: "radial-gradient(circle at 35% 35%, #E8C96A, #9A7B35)",
                  boxShadow: "0 3px 14px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.22)",
                  border: "1.5px solid rgba(201,168,76,0.7)",
                }}
                /* pulse while waiting */
                animate={
                  phase === "waiting"
                    ? { scale: [1, 1.07, 1], boxShadow: ["0 3px 14px rgba(0,0,0,0.45)", "0 0 22px rgba(201,168,76,0.55)", "0 3px 14px rgba(0,0,0,0.45)"] }
                    : { scale: 1 }
                }
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span style={{ color: "#FDF6E3", fontSize: 20, lineHeight: 1 }}>♥</span>
              </motion.div>

              {/* ── FLAP ── */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 50, left: 0,
                  width: "100%",
                  height: 128,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  zIndex: 15,
                }}
                animate={{ rotateX: isOpen ? -170 : 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 320 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                  <path d="M0 0 L320 0 L160 128 Z" fill="#EDD9B0" />
                  <path d="M1.5 1.5 L318.5 1.5 L160 123 Z" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M22 0 L160 112 L298 0" fill="none" stroke="rgba(201,168,76,0.14)" strokeWidth="1" />
                </svg>
              </motion.div>
            </motion.div>

            {/* ── OPEN BUTTON ── */}
            <AnimatePresence>
              {phase === "waiting" && (
                <motion.div
                  className="mt-8 flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.button
                    id="open-invitation-btn"
                    onClick={handleClick}
                    className="relative flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-[#1A0F0F] cursor-pointer border-none overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #F7E7C1 0%, #E8C96A 35%, #C9A84C 65%, #9A7B35 100%)",
                      fontSize: "0.9rem",
                      letterSpacing: "0.15em",
                      boxShadow: "0 4px 24px rgba(201,168,76,0.35), 0 1px 0 rgba(255,255,255,0.25) inset",
                    }}
                    whileHover={{ scale: 1.06, boxShadow: "0 6px 32px rgba(201,168,76,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }}
                    />

                    {/* Envelope icon */}
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#2C1A1A" strokeWidth="1.5">
                      <rect x="1" y="1" width="16" height="12" rx="2" />
                      <path d="M1 3L9 8L17 3" />
                    </svg>

                    <span>افتح الدعوة</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
