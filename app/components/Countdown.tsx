"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Wedding date: March 15, 2026 at 18:00 (Riyadh time = UTC+3)
const WEDDING_DATE = new Date("2026-03-15T18:00:00+03:00");

interface TimeUnit {
  value: number;
  label: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getTimeLeft(): TimeUnit[] {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return [
      { value: 0, label: "يوم" },
      { value: 0, label: "ساعة" },
      { value: 0, label: "دقيقة" },
      { value: 0, label: "ثانية" },
    ];
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return [
    { value: days,    label: "يوم" },
    { value: hours,   label: "ساعة" },
    { value: minutes, label: "دقيقة" },
    { value: seconds, label: "ثانية" },
  ];
}

function CountUnit({ value, label }: TimeUnit) {
  const displayed = pad(value);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Number box */}
      <div
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(44,26,26,0.6)",
          border: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,168,76,0.15)",
        }}
      >
        {/* Shimmer line */}
        <div
          className="absolute top-1/2 inset-x-0 h-px -translate-y-1/2"
          style={{ background: "rgba(201,168,76,0.15)" }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayed}
            className="font-bold text-gradient-gold"
            style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)" }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {displayed}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span className="text-[#F5EDD8]/60 text-xs md:text-sm tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [units, setUnits] = useState<TimeUnit[]>(getTimeLeft());
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #F5EDD8 0%, #FDF6E3 100%)" }}
    >
      {/* Top wave divider */}
      <div className="absolute top-0 inset-x-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 64 C360 0, 1080 0, 1440 64 L1440 0 L0 0 Z" fill="#2C1A1A" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A84C]/70 text-sm tracking-[0.4em] uppercase mb-3">
            الوقت المتبقي
          </p>
          <h2
            className="font-bold text-[#2C1A1A] mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            العد التنازلي حتى{" "}
            <span className="text-gradient-gold">يوم الفرح</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </motion.div>

        {/* Countdown units */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start gap-4 md:gap-8">
              <CountUnit {...unit} />
              {i < units.length - 1 && (
                <motion.span
                  className="text-[#C9A84C] font-bold mt-6 md:mt-8"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  :
                </motion.span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Wedding date reminder */}
        <motion.p
          className="mt-12 text-[#4A2828]/60 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          السبت ١٥ مارس ٢٠٢٦ — الساعة الثامنة مساءً
        </motion.p>
      </div>
    </section>
  );
}
