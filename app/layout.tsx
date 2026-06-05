import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Layla & Ahmed — Wedding Invitation 💍",
  description:
    "Join us to celebrate the wedding of Layla & Ahmed — Saturday, March 15, 2026 at Al-Amira Palace, Riyadh.",
  keywords: ["wedding", "invitation", "Layla", "Ahmed", "زفاف", "دعوة"],
  openGraph: {
    title: "Layla & Ahmed — Wedding Invitation",
    description: "Saturday, March 15, 2026 · Al-Amira Palace, Riyadh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
    >
      <body className="font-[family-name:var(--font-cairo)] bg-[#FDF6E3] text-[#2C1A1A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
