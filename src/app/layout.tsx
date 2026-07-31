import type { Metadata } from "next";
import { Bitcount, Inter_Tight, Lexend, Inter, Baloo_2 } from "next/font/google";
import "./globals.css";

const bitcount = Bitcount({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bitcount",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter-tight",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-lexend",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "playn",
  description: "Track daily goals and streaks with your crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bitcount.variable} ${interTight.variable} ${lexend.variable} ${inter.variable} ${baloo2.variable} h-full`}
    >
      <body className="min-h-full bg-[#020303] font-[family-name:var(--font-inter)] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
