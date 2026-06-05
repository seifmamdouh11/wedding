"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DetailCard {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

const CalendarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DressIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3 6h4l-5 4 2 6-4-3-4 3 2-6-5-4h4z" />
  </svg>
);

const cards: DetailCard[] = [
  {
    icon: <CalendarIcon />,
    title: "التاريخ",
    lines: ["السبت", "١٥ مارس ٢٠٢٦", "١٥ شعبان ١٤٤٧ هـ"],
  },
  {
    icon: <ClockIcon />,
    title: "التوقيت",
    lines: ["استقبال الضيوف", "من الثامنة مساءً", "حتى منتصف الليل"],
  },
  {
    icon: <LocationIcon />,
    title: "المكان",
    lines: ["قصر الأميرة", "حي الورود، الرياض", "المملكة العربية السعودية"],
  },
  {
    icon: <DressIcon />,
    title: "كود الحضور",
    lines: ["الأناقة الرسمية", "ألوان هادئة وراقية", "العباءات مُرحَّب بها"],
  },
];

export default function EventDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="details"
      ref={ref}
      className="relative py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, #2C1A1A 0%, #3D2020 50%, #2C1A1A 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A84C]/60 text-sm tracking-[0.4em] uppercase mb-3">
            تفاصيل الاحتفال
          </p>
          <h2
            className="font-bold text-gradient-gold mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            تفاصيل الحفل
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              id={`detail-card-${i}`}
              className="relative group flex flex-col items-center text-center p-8 rounded-2xl cursor-default overflow-hidden"
              style={{
                background: "rgba(253,246,227,0.04)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(201,168,76,0.6)",
                background: "rgba(253,246,227,0.07)",
                boxShadow: "0 0 40px rgba(201,168,76,0.2)",
                y: -4,
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(201,168,76,0.08) 0%, transparent 60%)",
                }}
              />

              {/* Icon */}
              <motion.div
                className="text-[#C9A84C] mb-5 p-3 rounded-full"
                style={{ background: "rgba(201,168,76,0.1)" }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                {card.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-[#C9A84C] font-bold text-lg mb-4">
                {card.title}
              </h3>

              {/* Lines */}
              <div className="flex flex-col gap-1">
                {card.lines.map((line, j) => (
                  <p
                    key={j}
                    className={
                      j === 0
                        ? "text-[#F5EDD8] font-semibold"
                        : "text-[#F5EDD8]/60 text-sm"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
