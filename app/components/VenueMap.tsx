"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Embedded map: a prominent location in Riyadh (placeholder coordinates)
// Using OpenStreetMap embed as a free alternative to Google Maps
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6758!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa";

export default function VenueMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="venue"
      ref={ref}
      className="relative py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, #2C1A1A 0%, #3D2020 50%, #2C1A1A 100%)",
      }}
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A84C]/60 text-sm tracking-[0.4em] uppercase mb-3">
            موقع الحفل
          </p>
          <h2
            className="font-bold text-gradient-gold mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            قصر الأميرة
          </h2>
          <p className="text-[#F5EDD8]/60 text-base">
            حي الورود — الرياض، المملكة العربية السعودية
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </motion.div>

        {/* Map container */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(201,168,76,0.3)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.4), 0 0 40px rgba(201,168,76,0.1)",
          }}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Gold overlay border effect */}
          <div
            className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
            style={{
              boxShadow: "inset 0 0 30px rgba(201,168,76,0.08)",
            }}
          />

          <iframe
            id="venue-map"
            src={MAP_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع حفل الزفاف — قصر الأميرة، الرياض"
          />
        </motion.div>

        {/* Quick info cards below map */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            {
              icon: "📍",
              label: "العنوان",
              value: "حي الورود، شارع الأمير فيصل، الرياض",
            },
            {
              icon: "🚗",
              label: "مواقف السيارات",
              value: "متاح مجاناً بجانب القصر",
            },
            {
              icon: "📞",
              label: "للاستفسار",
              value: "+966 50 000 0000",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-4 rounded-2xl text-right"
              style={{
                background: "rgba(253,246,227,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[#C9A84C] font-semibold text-sm mb-1">
                  {item.label}
                </p>
                <p className="text-[#F5EDD8]/60 text-xs leading-relaxed">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
