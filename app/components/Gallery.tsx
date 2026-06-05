"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const images = [
  { src: "/gallery-1.png", alt: "العروس", caption: "لحظات لا تُنسى" },
  { src: "/gallery-2.png", alt: "قاعة الحفل", caption: "قصر الأميرة" },
  { src: "/gallery-3.png", alt: "العروسان", caption: "بداية رحلة العمر" },
  { src: "/gallery-4.png", alt: "الزهور", caption: "عطر الياسمين" },
  { src: "/gallery-5.png", alt: "الكعكة", caption: "حلاوة اللحظة" },
  { src: "/gallery-6.png", alt: "الخواتم", caption: "ميثاق غليظ" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FDF6E3 0%, #F5EDD8 100%)" }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A84C]/70 text-sm tracking-[0.4em] uppercase mb-3">
            لحظات الفرح
          </p>
          <h2
            className="font-bold text-[#2C1A1A] mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            معرض <span className="text-gradient-gold">الصور</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              id={`gallery-item-${i}`}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-end p-4"
                style={{
                  background: "linear-gradient(to top, rgba(44,26,26,0.85) 0%, transparent 60%)",
                }}
              >
                <p className="text-[#F7E7C1] font-semibold text-sm">
                  {img.caption}
                </p>
                <div className="mt-2 w-8 h-px bg-[#C9A84C]" />
              </div>

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ border: "1px solid rgba(201,168,76,0.5)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            id="lightbox-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(26,15,15,0.95)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full aspect-square rounded-3xl overflow-hidden"
              style={{ border: "1px solid rgba(201,168,76,0.3)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                fill
                className="object-cover"
                sizes="90vw"
                priority
              />

              {/* Caption */}
              <div
                className="absolute bottom-0 inset-x-0 p-6 text-center"
                style={{
                  background: "linear-gradient(to top, rgba(44,26,26,0.9), transparent)",
                }}
              >
                <p className="text-[#C9A84C] font-bold text-lg">
                  {images[lightbox].caption}
                </p>
              </div>

              {/* Close */}
              <button
                id="lightbox-close"
                className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-[#F5EDD8] bg-[#2C1A1A]/70 border border-[#C9A84C]/30 cursor-pointer text-xl font-bold hover:bg-[#C9A84C]/20 transition-colors"
                onClick={() => setLightbox(null)}
                aria-label="إغلاق"
              >
                ✕
              </button>

              {/* Prev / Next */}
              <button
                id="lightbox-prev"
                className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[#F5EDD8] bg-[#2C1A1A]/70 border border-[#C9A84C]/30 cursor-pointer hover:bg-[#C9A84C]/20 transition-colors"
                onClick={() => setLightbox((lightbox + 1) % images.length)}
                aria-label="التالي"
              >
                ‹
              </button>
              <button
                id="lightbox-next"
                className="absolute top-1/2 left-14 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[#F5EDD8] bg-[#2C1A1A]/70 border border-[#C9A84C]/30 cursor-pointer hover:bg-[#C9A84C]/20 transition-colors"
                onClick={() =>
                  setLightbox((lightbox - 1 + images.length) % images.length)
                }
                aria-label="السابق"
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
