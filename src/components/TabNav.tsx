"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Feed" },
  { href: "/tocadas", label: "Tocadas" },
  { href: "/recuerdos", label: "Recuerdos" }
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="flex border-b border-sand/60 text-sm md:hidden">
      {TABS.map((tab) => {
        const activo = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 text-center py-3 font-display tracking-wide uppercase transition-colors ${
              activo ? "border-b-2 border-coral text-ink" : "text-ink/50"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
