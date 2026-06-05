"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "الدعوة", href: "#invitation" },
  { label: "تفاصيل الحفل", href: "#details" },
  { label: "العد التنازلي", href: "#countdown" },
  { label: "المكان", href: "#venue" },
  { label: "معرض الصور", href: "#gallery" },
  { label: "تأكيد الحضور", href: "#rsvp" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        style={{
          background: scrolled
            ? "rgba(44,26,26,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.span
            className="text-[#C9A84C] text-lg font-bold tracking-wider cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ل & أ
          </motion.span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-sm font-medium text-[#F5EDD8]/80 hover:text-[#C9A84C] transition-colors duration-300 cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="قائمة التنقل"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-6 h-0.5 bg-[#C9A84C]"
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 8 }
                      : i === 2
                      ? { rotate: -45, y: -8 }
                      : { opacity: 0 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.3 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(44,26,26,0.97)", backdropFilter: "blur(20px)" }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.ul
              className="flex flex-col items-center justify-center h-full gap-8 list-none"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-2xl font-semibold text-[#F5EDD8] hover:text-[#C9A84C] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
