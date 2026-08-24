import type { Metadata } from "next";
import { Bungee, Work_Sans } from "next/font/google";

// CSS is processed by Next.js at runtime and has no TypeScript module declaration.

import "./globals.css";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work",
});

export const metadata: Metadata = {
  title: "Subsuelo - Encuentra tocadas en tu ciudad",
  description:
    "El punto de encuentro de bandas, fans y organizadores del under peruano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bungee.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}