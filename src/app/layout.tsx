import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import SideNav from "@/components/SideNav";
// @ts-expect-error - Next.js handles global CSS imports without a declaration file
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = Space_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "SCena Peru",
  description: "Bandas, tocadas y recuerdos de la escena musical peruana"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}