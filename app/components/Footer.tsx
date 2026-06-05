"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A0F0F 0%, #0D0808 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 arabesque-pattern"
        style={{ backgroundSize: "80px 80px" }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Top ornament */}
        <motion.div
          className="flex items-center gap-3 w-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/50" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              fill="rgba(201,168,76,0.7)"
            />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/50" />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2
            className="font-bold text-gradient-gold"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            ليلى &amp; أحمد
          </h2>
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-[#F5EDD8]/50 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ١٥ مارس ٢٠٢٦ | قصر الأميرة، الرياض
        </motion.p>

        {/* Closing verse */}
        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-[#C9A84C]/70 text-sm leading-loose italic">
            ﴿ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ ﴾
          </p>
        </motion.div>

        {/* Bottom diamonds */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rotate-45"
              style={{ background: `rgba(201,168,76,${0.3 + i * 0.25})` }}
            />
          ))}
        </motion.div>

        {/* Copyright */}
        <p className="text-[#F5EDD8]/20 text-xs mt-4">
          صُنِع بالحب ✦ ٢٠٢٦
        </p>
      </div>
    </footer>
  );
}
