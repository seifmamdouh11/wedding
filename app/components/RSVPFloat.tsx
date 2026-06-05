"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RSVPFloat() {
  const [visible, setVisible] = useState(false);

  // Appear after hero content has settled
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          id="rsvp-float-btn"
          href="https://wa.me/966500000000?text=أود%20تأكيد%20حضوري%20لحفل%20زفاف%20Layla%20%26%20Ahmed"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-[#1A0F0F] no-underline overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F7E7C1 0%, #E8C96A 35%, #C9A84C 65%, #9A7B35 100%)",
            boxShadow: "0 4px 20px rgba(201,168,76,0.4), 0 1px 0 rgba(255,255,255,0.2) inset",
            fontSize: "0.82rem",
            letterSpacing: "0.06em",
          }}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.07, boxShadow: "0 6px 28px rgba(201,168,76,0.55)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="RSVP via WhatsApp"
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.32) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.5 }}
          />

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(201,168,76,0.5)" }}
            animate={{ scale: [1, 1.18], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />

          {/* WhatsApp icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A0F0F">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.11.553 4.09 1.518 5.814L.057 23.272a.75.75 0 00.92.92l5.458-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.384l-.363-.214-3.764 1.008 1.009-3.675-.233-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>

          <span>RSVP</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
