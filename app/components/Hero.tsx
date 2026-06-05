"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Particle system ──────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; dAlpha: number; color: string;
}

function initParticles(canvas: HTMLCanvasElement): Particle[] {
  const colors = ["#C9A84C", "#E8C96A", "#F7E7C1", "#9A7B35", "#C9A84C"];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 100);
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.4 - 0.1,
    size: Math.random() * 2 + 0.4,
    alpha: Math.random() * 0.6,
    dAlpha: (Math.random() - 0.5) * 0.006,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

// ── Countdown ────────────────────────────────────────────────
const WEDDING_DATE = new Date("2026-03-15T18:00:00+03:00");
interface TimeUnit { value: number; label: string; labelEn: string }

function pad(n: number) { return n.toString().padStart(2, "0"); }

function getTimeLeft(): TimeUnit[] {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return [
    { value: 0, label: "يوم",   labelEn: "Days"    },
    { value: 0, label: "ساعة",  labelEn: "Hours"   },
    { value: 0, label: "دقيقة", labelEn: "Minutes" },
    { value: 0, label: "ثانية", labelEn: "Seconds" },
  ];
  return [
    { value: Math.floor(diff / 86400000),              label: "يوم",   labelEn: "Days"    },
    { value: Math.floor((diff % 86400000) / 3600000),  label: "ساعة",  labelEn: "Hours"   },
    { value: Math.floor((diff % 3600000) / 60000),     label: "دقيقة", labelEn: "Minutes" },
    { value: Math.floor((diff % 60000) / 1000),        label: "ثانية", labelEn: "Seconds" },
  ];
}

function CountUnit({ value, label, labelEn, index }: TimeUnit & { index: number }) {
  const isLast = index === 3;
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="flex flex-col items-center gap-2">
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: "clamp(58px, 11vw, 84px)",
            height: "clamp(58px, 11vw, 84px)",
            background: "rgba(253,246,227,0.04)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(201,168,76,0.1)",
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "rgba(201,168,76,0.08)" }} />
          <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-xl" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)" }} />
          <AnimatePresence mode="popLayout">
            <motion.span
              key={pad(value)}
              className="font-bold tabular-nums"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                background: "linear-gradient(160deg, #F7E7C1 0%, #E8C96A 40%, #C9A84C 70%, #9A7B35 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0,   opacity: 1 }}
              exit={{   y:  24, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {pad(value)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[#F5EDD8]/65 font-medium" style={{ fontSize: "clamp(9px, 1.8vw, 11px)" }}>{label}</span>
          <span className="text-[#F5EDD8]/22 uppercase tracking-widest" style={{ fontSize: "8px" }}>{labelEn}</span>
        </div>
      </div>
      {!isLast && (
        <motion.div
          className="flex flex-col gap-1.5 mb-8"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-1 h-1 rounded-full bg-[#C9A84C]/50" />
          <div className="w-1 h-1 rounded-full bg-[#C9A84C]/25" />
        </motion.div>
      )}
    </div>
  );
}

// ── Floating ornament ────────────────────────────────────────
function Ornament({ className, delay = 0, size = 48, duration = 8 }: {
  className?: string; delay?: number; size?: number; duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0], opacity: [0.14, 0.28, 0.14] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 2L27.5 20.5L46 24L27.5 27.5L24 46L20.5 27.5L2 24L20.5 20.5Z"
          fill="#C9A84C" stroke="#E8C96A" strokeWidth="0.5" />
        <circle cx="24" cy="24" r="7" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
      </svg>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [units, setUnits] = useState<TimeUnit[]>(getTimeLeft());
  const [ready, setReady] = useState(false);

  // Delay entrance until preloader has had time to exit
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas);
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.dAlpha;
        if (p.alpha <= 0 || p.alpha >= 0.7) p.dAlpha *= -1;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setUnits(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Stagger helper — delays relative to when hero becomes ready
  const up = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: "linear-gradient(168deg, #130909 0%, #1E0E0E 30%, #2C1A1A 60%, #1E0E0E 100%)" }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Arabesque grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.3' opacity='0.18'%3E%3Ccircle cx='30' cy='30' r='26'/%3E%3Ccircle cx='30' cy='30' r='18'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3Cpath d='M30 4 L30 56 M4 30 L56 30 M9.4 9.4 L50.6 50.6 M50.6 9.4 L9.4 50.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          opacity: 0.55,
        }}
      />

      {/* Spotlight */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 65%)" }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ boxShadow: "inset 0 0 130px rgba(0,0,0,0.6)" }} />

      {/* Thin gold frame lines — top and bottom */}
      <div className="absolute top-6 inset-x-10 h-px pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)" }} />
      <div className="absolute bottom-6 inset-x-10 h-px pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)" }} />

      {/* Ornaments */}
      <Ornament className="top-[8%]  right-[6%]"  delay={0}    size={50} duration={8}  />
      <Ornament className="top-[11%] left-[5%]"   delay={1.8}  size={36} duration={10} />
      <Ornament className="bottom-[13%] right-[7%]" delay={0.9} size={42} duration={7} />
      <Ornament className="bottom-[16%] left-[6%]" delay={2.4} size={30} duration={9} />
      <Ornament className="top-[42%]  right-[2%]" delay={3}    size={22} duration={11} />
      <Ornament className="top-[38%]  left-[2%]"  delay={1.3}  size={26} duration={6}  />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl gap-0">

        {/* Eyebrow */}
        <motion.p {...up(0.15)}
          className="text-[#C9A84C]/45 tracking-[0.55em] uppercase mb-7"
          style={{ fontSize: "clamp(8px, 1.8vw, 10px)" }}
        >
          Wedding Invitation · دعوة زفاف
        </motion.p>

        {/* Names */}
        <motion.div {...up(0.35)} className="flex flex-col items-center gap-0 mb-2">
          <h1
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 8.5rem)",
              background: "linear-gradient(160deg, #F7E7C1 0%, #E8C96A 25%, #C9A84C 55%, #9A7B35 80%, #C9A84C 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
              letterSpacing: "-0.025em",
            }}
          >
            Layla
          </h1>

          <div className="flex items-center gap-3 my-1 w-44">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
            <span className="text-[#C9A84C]/40 font-thin" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>&amp;</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
          </div>

          <h1
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 8.5rem)",
              background: "linear-gradient(160deg, #F7E7C1 0%, #E8C96A 25%, #C9A84C 55%, #9A7B35 80%, #C9A84C 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
              animationDelay: "2.5s",
              letterSpacing: "-0.025em",
            }}
          >
            Ahmed
          </h1>
        </motion.div>

        {/* ── Ornamental rule ── */}
        <motion.div {...up(0.55)} className="flex items-center gap-3 w-full max-w-[240px] my-7">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/45" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9.4 6.6 15 8 9.4 9.4 8 15 6.6 9.4 1 8 6.6 6.6Z" fill="#C9A84C" opacity="0.75" />
          </svg>
          <div className="w-1 h-1 rotate-45 bg-[#C9A84C]/45" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9.4 6.6 15 8 9.4 9.4 8 15 6.6 9.4 1 8 6.6 6.6Z" fill="#C9A84C" opacity="0.75" />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/45" />
        </motion.div>

        {/* ── Glass info card: date + location ── */}
        <motion.div
          {...up(0.75)}
          className="w-full max-w-sm mb-10 rounded-2xl px-6 py-5 flex flex-col items-center gap-3"
          style={{
            background: "rgba(253,246,227,0.04)",
            border: "1px solid rgba(201,168,76,0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(201,168,76,0.08)",
          }}
        >
          {/* Date row */}
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-[#F5EDD8] font-semibold tracking-wider" style={{ fontSize: "clamp(0.82rem, 2.2vw, 1rem)" }}>
              Saturday — March 15, 2026
            </p>
          </div>

          <div className="w-full h-px" style={{ background: "rgba(201,168,76,0.12)" }} />

          {/* Location row — opens Maps */}
          <a
            href="https://maps.google.com/?q=Al+Wuroud,+Riyadh,+Saudi+Arabia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group transition-all duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-[#F5EDD8]/50 group-hover:text-[#C9A84C] transition-colors tracking-wide underline-offset-4 group-hover:underline"
              style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.82rem)" }}>
              Al-Amira Palace — Al Wuroud, Riyadh
            </p>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#C9A84C" strokeWidth="1.8"
              className="opacity-0 group-hover:opacity-70 transition-opacity -translate-y-0.5">
              <path d="M2 10L10 2M10 2H5M10 2V7" />
            </svg>
          </a>
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div {...up(0.95)} className="flex items-center justify-center flex-wrap gap-0">
          {units.map((unit, i) => (
            <CountUnit key={unit.label} {...unit} index={i} />
          ))}
        </motion.div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-px mx-auto bg-gradient-to-b from-[#C9A84C]/40 to-transparent"
            style={{ height: 48 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
