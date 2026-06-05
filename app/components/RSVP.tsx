"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
}

interface Errors {
  name?: string;
  phone?: string;
  guests?: string;
  attending?: string;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "الرجاء إدخال الاسم الكريم";
  if (!data.phone.match(/^[\d\s\+\-]{7,15}$/))
    errors.phone = "الرجاء إدخال رقم جوال صحيح";
  if (!data.guests || parseInt(data.guests) < 1)
    errors.guests = "الرجاء تحديد عدد الضيوف";
  if (!data.attending) errors.attending = "الرجاء تأكيد حضوركم";
  return errors;
}

// Confetti particle
function ConfettiPiece({ i }: { i: number }) {
  const colors = ["#C9A84C", "#E8C96A", "#F7E7C1", "#9A7B35", "#ffffff"];
  const color = colors[i % colors.length];
  return (
    <motion.div
      className="absolute w-2 h-2 rotate-45 pointer-events-none"
      style={{
        background: color,
        left: `${10 + (i * 7) % 80}%`,
        top: "20%",
      }}
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{
        y: [0, -80 - Math.random() * 120, 200],
        x: [(Math.random() - 0.5) * 200],
        opacity: [1, 1, 0],
        rotate: [45, 45 + 720],
        scale: [1, 1.5, 0.5],
      }}
      transition={{
        duration: 2 + Math.random(),
        delay: i * 0.05,
        ease: "easeOut",
      }}
    />
  );
}

export default function RSVP() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    guests: "",
    attending: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof Errors) =>
    [
      "w-full px-5 py-3.5 rounded-xl text-right font-[family-name:var(--font-cairo)] text-[#2C1A1A] text-base",
      "bg-white/80 border transition-all duration-300 outline-none",
      "focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C]",
      errors[field]
        ? "border-red-400 bg-red-50/50"
        : "border-[#C9A84C]/30 hover:border-[#C9A84C]/60",
    ].join(" ");

  return (
    <section
      id="rsvp"
      ref={ref}
      className="relative py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, #2C1A1A 0%, #3D2020 50%, #2C1A1A 100%)",
      }}
    >
      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A84C]/60 text-sm tracking-[0.4em] uppercase mb-3">
            مشاركتكم شرف لنا
          </p>
          <h2
            className="font-bold text-gradient-gold mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            تأكيد الحضور
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
          style={{
            background: "rgba(253,246,227,0.06)",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                noValidate
              >
                {/* Name */}
                <div>
                  <label className="block text-[#C9A84C] font-semibold text-sm mb-2">
                    الاسم الكريم
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكريم"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#C9A84C] font-semibold text-sm mb-2">
                    رقم الجوال
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+966 5X XXX XXXX"
                    className={inputClass("phone")}
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[#C9A84C] font-semibold text-sm mb-2">
                    عدد الضيوف
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="١"
                    min={1}
                    max={10}
                    className={inputClass("guests")}
                  />
                  {errors.guests && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.guests}</p>
                  )}
                </div>

                {/* Attending */}
                <div>
                  <label className="block text-[#C9A84C] font-semibold text-sm mb-2">
                    تأكيد الحضور
                  </label>
                  <select
                    id="rsvp-attending"
                    name="attending"
                    value={form.attending}
                    onChange={handleChange}
                    className={inputClass("attending")}
                  >
                    <option value="" disabled>
                      اختر ...
                    </option>
                    <option value="yes">نعم، سأحضر بإذن الله ✓</option>
                    <option value="no">آسف، لن أتمكن من الحضور</option>
                  </select>
                  {errors.attending && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.attending}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  id="rsvp-submit"
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-[#2C1A1A] text-lg cursor-pointer border-none mt-2 flex items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #E8C96A 0%, #C9A84C 60%, #9A7B35 100%)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(201,168,76,0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-[#2C1A1A]/30 border-t-[#2C1A1A] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    "إرسال التأكيد"
                  )}
                </motion.button>
              </motion.form>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                className="relative flex flex-col items-center text-center py-8 gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Confetti */}
                {Array.from({ length: 20 }, (_, i) => (
                  <ConfettiPiece key={i} i={i} />
                ))}

                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: "rgba(201,168,76,0.15)", border: "2px solid #C9A84C" }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✓
                </motion.div>

                <h3 className="text-2xl font-bold text-[#C9A84C]">
                  شكراً لك!
                </h3>
                <p className="text-[#F5EDD8]/70 leading-relaxed max-w-sm">
                  تم تأكيد حضوركم بنجاح
                  <br />
                  نتطلع إلى مشاركتكم هذه المناسبة السعيدة
                </p>
                <p className="text-[#C9A84C]/60 text-sm">
                  بارك الله فيكم ✦
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
