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
  title: "دعوة زفاف ليلى وأحمد | Wedding Invitation",
  description:
    "نتشرف بدعوتكم لحضور حفل زفاف ليلى وأحمد — بإذن الله وتوفيقه في قصر الأميرة، الرياض",
  keywords: ["زواج", "دعوة زفاف", "حفل زفاف", "ليلى وأحمد"],
  openGraph: {
    title: "دعوة زفاف ليلى وأحمد",
    description:
      "يسرّنا دعوتكم لمشاركتنا فرحة هذه المناسبة السعيدة",
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
