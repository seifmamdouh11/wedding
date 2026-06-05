"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  { text: "بسم الله الرحمن الرحيم", size: "text-xl", gold: true },
  { text: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾", size: "text-base md:text-lg", gold: false, quran: true },
  { text: "صدق الله العظيم", size: "text-sm", gold: true },
  { text: "", size: "", gold: false },
  { text: "يتشرف", size: "text-base", gold: false },
  { text: "آل الرشيد وآل المحمود", size: "text-2xl md:text-3xl font-bold", gold: true },
  { text: "بدعوتكم الكريمة لحضور حفل زفاف نجليهم الكريمين", size: "text-base", gold: false },
  { text: "", size: "", gold: false },
  { text: "العروسين", size: "text-lg", gold: false },
  { text: "ليلى بنت عبدالرحمن الرشيد", size: "text-2xl md:text-3xl font-bold", gold: true },
  { text: "&", size: "text-3xl", gold: false },
  { text: "أحمد بن خالد المحمود", size: "text-2xl md:text-3xl font-bold", gold: true },
  { text: "", size: "", gold: false },
  { text: "وذلك بتاريخ السبت ١٥ مارس ٢٠٢٦", size: "text-base md:text-lg", gold: false },
  { text: "الموافق ١٥ شعبان ١٤٤٧ هـ", size: "text-base", gold: false },
  { text: "عند الساعة الثامنة مساءً", size: "text-base", gold: false },
  { text: "", size: "", gold: false },
  { text: "نسأل الله لهما دوام السعادة والتوفيق", size: "text-sm", gold: false, italic: true },
];

export default function InvitationMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="invitation"
      ref={ref}
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FDF6E3 0%, #F5EDD8 100%)" }}
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 opacity-5 arabesque-pattern"
        style={{ backgroundSize: "120px 120px" }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Top ornamental frame */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z"
              fill="rgba(201,168,76,0.8)"
            />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C] to-transparent" />
        </motion.div>

        {/* Invitation card */}
        <motion.div
          className="glass-gold rounded-3xl p-8 md:p-14 text-center shadow-[0_8px_60px_rgba(201,168,76,0.15)]"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {lines.map((line, i) => {
            if (!line.text)
              return <div key={i} className="h-4" />;

            return (
              <motion.p
                key={i}
                className={[
                  line.size,
                  line.gold ? "text-[#C9A84C] font-bold" : "text-[#4A2828]",
                  line.quran
                    ? "leading-loose border-r-4 border-[#C9A84C]/40 pr-4 my-2 text-right"
                    : "",
                  line.italic ? "italic text-[#C9A84C]/70" : "",
                  "leading-relaxed mb-1",
                ].join(" ")}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.07,
                  ease: "easeOut",
                }}
              >
                {line.text}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="flex items-center gap-4 mt-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rotate-45 bg-[#C9A84C]"
              />
            ))}
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A84C] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
