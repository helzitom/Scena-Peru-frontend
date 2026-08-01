"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", icon: "⌂" },
  { href: "/tocadas", icon: "⚑" },
  { href: "/publicar", icon: "+" },
  { href: "/perfil", icon: "☺" }
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-paper border-t border-sand/60 flex justify-around py-3 max-w-md mx-auto">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-xl ${pathname === item.href ? "text-coral" : "text-ink/40"}`}
        >
          {item.icon}
        </Link>
      ))}
    </nav>
  );
}
