"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { haySesion } from "@/lib/auth";

const SPIKES = Array.from({ length: 20 });

const EVENTS = [
  { band: "Ruido Norte", venue: "Centro Cultural Barranco", city: "Lima", date: "31 AGO", genre: "Garage" },
  { band: "Vitral Roto", venue: "La Noche de Barranco", city: "Lima", date: "07 SEP", genre: "Indie" },
  { band: "Concreto Vivo", venue: "Club Lluvia", city: "Arequipa", date: "14 SEP", genre: "Punk" },
  { band: "Andina Fuzz", venue: "Teatro Municipal", city: "Trujillo", date: "21 SEP", genre: "Rock" },
  { band: "Sombra Emo", venue: "El Dragón", city: "Lima", date: "28 SEP", genre: "Emo" },
  { band: "Prisma Lento", venue: "Auditorio Peñarol", city: "Lima", date: "05 OCT", genre: "Prog" },
];

const GENRE_PILL: Record<string, string> = {
  Garage: "bg-ambar/15 text-ambar border border-ambar/30",
  Indie: "bg-acero/15 text-acero border border-acero/30",
  Punk: "bg-rojo/15 text-rojo border border-rojo/30",
  Rock: "bg-rojo/10 text-rojo border border-rojo/20",
  Emo: "bg-zinc text-niebla border border-zinc",
  Prog: "bg-verde/15 text-verde border border-verde/30",
};

export default function Page() {
  const [activeCity, setActiveCity] = useState("Todos");
  const [sesionActiva, setSesionActiva] = useState(false);
  const cities = ["Todos", "Lima", "Arequipa", "Trujillo"];
  const filtered =
    activeCity === "Todos" ? EVENTS : EVENTS.filter((e) => e.city === activeCity);

  useEffect(() => {
    setSesionActiva(haySesion());
  }, []);

  const destinoPrincipal = sesionActiva ? "/feed" : "/login";

  return (
    <main className="bg-abismo text-crema min-h-screen overflow-x-hidden">

      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-14 py-5 border-b border-crema/8">
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-bungee)] text-base text-crema tracking-wide">
            SUBSUELO
          </span>
          <span className="text-[10px] font-medium text-humo uppercase tracking-widest border border-zinc px-2 py-0.5 rounded">
            PE
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-niebla">
          <a href="#eventos" className="hover:text-crema transition-colors">Eventos</a>
          <a href="#roles" className="hover:text-crema transition-colors">Para ti</a>
          <a href="#nosotros" className="hover:text-crema transition-colors">Nosotros</a>
        </nav>
        <Link
          href={destinoPrincipal}
          className="font-[family-name:var(--font-bungee)] text-xs bg-rojo text-crema px-5 py-2.5 rounded hover:bg-rojo/85 transition-colors"
        >
          {sesionActiva ? "Ir al feed" : "Entrar"}
        </Link>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <svg viewBox="0 0 700 700" className="w-[130%] max-w-none md:w-[90%] opacity-[0.06]">
            {SPIKES.map((_, i) => {
              const ang = (360 / SPIKES.length) * i;
              return (
                <line
                  key={i}
                  x1="350" y1="350" x2="350" y2="-40"
                  stroke={i % 2 === 0 ? "#d4cfc5" : "#b84030"}
                  strokeWidth={i % 2 === 0 ? "14" : "4"}
                  transform={`rotate(${ang} 350 350)`}
                />
              );
            })}
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(184,64,48,0.06),transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-medium text-humo tracking-[0.35em] uppercase text-[10px] md:text-xs mb-6">
            Lima · Arequipa · Trujillo
          </p>
          <h1 className="font-[family-name:var(--font-bungee)] text-5xl sm:text-7xl md:text-[6rem] leading-[0.92] text-crema -rotate-1 inline-block">
            LA ESCENA
            <br />
            <span className="text-rojo">NO SE</span>
            <br />
            DETIENE
          </h1>
          <p className="mt-8 max-w-md mx-auto text-sm md:text-base text-niebla leading-relaxed">
            El punto de encuentro de bandas, fans, organizadores y locales del Perú.
            Tocadas confirmadas, horarios, lanzamientos y fotasos de cada noche, en un solo lugar.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="font-[family-name:var(--font-bungee)] text-sm bg-rojo text-crema px-7 py-3.5 rounded hover:bg-rojo/85 transition-colors"
            >
              Crear cuenta gratis
            </Link>
            <a
              href="#eventos"
              className="font-[family-name:var(--font-bungee)] text-sm border border-zinc text-niebla px-7 py-3.5 rounded hover:border-niebla hover:text-crema transition-all"
            >
              Ver eventos →
            </a>
          </div>
          <div className="mt-16 inline-grid grid-cols-3 divide-x divide-crema/10 border border-crema/10 rounded">
            {[
              { n: "240+", label: "Bandas" },
              { n: "18", label: "Ciudades" },
              { n: "6.200", label: "Fans" },
            ].map((s) => (
              <div key={s.n} className="px-7 py-4">
                <p className="font-[family-name:var(--font-bungee)] text-2xl text-crema">{s.n}</p>
                <p className="text-[10px] text-humo uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="relative z-10 px-6 md:px-14 py-20 border-t border-crema/8">
        <p className="font-[family-name:var(--font-bungee)] text-[10px] tracking-[0.3em] text-humo uppercase mb-3">
          Para cada uno en la escena
        </p>
        <h2 className="font-[family-name:var(--font-bungee)] text-3xl md:text-4xl text-crema mb-12">
          ¿QUÉ ROL TOCAS?
        </h2>
        <div className="grid gap-px md:grid-cols-3 border border-crema/8 rounded overflow-hidden">
          {[
            {
              bar: "bg-rojo",
              num: "01",
              title: "Bandas",
              texto: "Sube tu música, avisa tus tocadas y arma tu cartel.",
              cta: "Subir mi banda",
              href: "/login?redirect=/publicar",
              items: ["Perfil con bio y links", "Anunciar fechas", "Galería de fotos"],
            },
            {
              bar: "bg-acero",
              num: "02",
              title: "Seguidores",
              texto: "Descubre tocadas cerca de ti y guarda los recuerdos de cada noche.",
              cta: "Explorar shows",
              href: "/login?redirect=/tocadas",
              items: ["Agenda personalizada", "Notificaciones de shows", "Fotos y set lists"],
            },
            {
              bar: "bg-ambar",
              num: "03",
              title: "Organizadores",
              texto: "Arma festivales, invita bandas y llena tu local.",
              cta: "Armar evento",
              href: "/login?redirect=/publicar",
              items: ["Booking de bandas", "Venta de entradas", "Panel de aforo"],
            },
          ].map((item) => (
            <div key={item.title} className="bg-carbón p-7 group hover:bg-plomo transition-colors">
              <div className={`w-8 h-0.5 ${item.bar} mb-6`} />
              <p className="font-medium text-[10px] tracking-widest text-humo uppercase mb-4">{item.num}</p>
              <p className="font-[family-name:var(--font-bungee)] text-xl text-crema mb-3">{item.title}</p>
              <p className="text-sm text-niebla mb-5 leading-relaxed">{item.texto}</p>
              <ul className="text-xs space-y-2 mb-7 text-humo">
                {item.items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full ${item.bar} flex-shrink-0`} />
                    {i}
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                className="inline-block font-[family-name:var(--font-bungee)] text-xs text-niebla border border-zinc px-5 py-2 rounded hover:text-crema hover:border-niebla transition-all"
              >
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" className="relative z-10 px-6 md:px-14 py-20 border-t border-crema/8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-[family-name:var(--font-bungee)] text-[10px] tracking-[0.3em] text-humo uppercase mb-3">
              Agenda confirmada
            </p>
            <h2 className="font-[family-name:var(--font-bungee)] text-3xl md:text-4xl text-crema">
              PRÓXIMAS TOCADAS
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCity(c)}
                className={`font-[family-name:var(--font-bungee)] text-xs px-4 py-2 rounded transition-all ${
                  activeCity === c
                    ? "bg-rojo text-crema"
                    : "text-niebla border border-zinc hover:border-niebla hover:text-crema"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-px border border-crema/8 rounded overflow-hidden">
          {filtered.map((ev, i) => (
            <Link
              key={i}
              href="/login?redirect=/tocadas"
              className="flex items-center gap-4 md:gap-6 bg-carbón px-5 py-4 hover:bg-plomo group transition-colors"
            >
              <div className="font-[family-name:var(--font-bungee)] text-ambar text-xs w-12 flex-shrink-0 text-center">
                {ev.date}
              </div>
              <div className="w-px h-7 bg-crema/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-[family-name:var(--font-bungee)] text-sm md:text-base text-crema truncate group-hover:text-arena transition-colors">
                  {ev.band}
                </p>
                <p className="text-xs text-humo truncate mt-0.5">{ev.venue} · {ev.city}</p>
              </div>
              <span className={`font-[family-name:var(--font-bungee)] text-[10px] px-2.5 py-1 rounded flex-shrink-0 ${GENRE_PILL[ev.genre]}`}>
                {ev.genre}
              </span>
              <svg className="w-3.5 h-3.5 text-zinc group-hover:text-niebla flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/login?redirect=/tocadas"
            className="inline-block font-[family-name:var(--font-bungee)] text-xs text-niebla border border-zinc px-8 py-3 rounded hover:border-niebla hover:text-crema transition-all"
          >
            Ver todos los eventos →
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="nosotros" className="relative px-6 md:px-14 py-28 border-t border-crema/8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(184,64,48,0.08),transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="font-[family-name:var(--font-bungee)] text-[10px] tracking-[0.3em] text-humo uppercase mb-4">
            Hecho en Perú
          </p>
          <h2 className="font-[family-name:var(--font-bungee)] text-4xl md:text-5xl text-crema mb-8 leading-[1.0]">
            LA ESCENA<br />SOMOS NOSOTROS
          </h2>
          <p className="text-niebla max-w-md mx-auto leading-relaxed mb-10 text-sm">
            Subsuelo nace desde la necesidad de unificar la escena musical peruana en un solo lugar. Encontrar conciertos, tocadas, horarios y fotos. Este es un espacio en el cual todas las bandas tienen la misma importancia y oportunidades de subir al escenario. Queremos que la música peruana siga creciendo y que todos los que formamos parte de ella podamos disfrutarla juntos.
          </p>
          <Link
            href="/login"
            className="inline-block font-[family-name:var(--font-bungee)] text-sm bg-rojo text-crema px-10 py-4 rounded hover:bg-rojo/85 transition-colors"
          >
            Únete aquí
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-14 py-7 border-t border-crema/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-humo">
        <span className="font-[family-name:var(--font-bungee)] text-niebla">SUBSUELO</span>
        <span>© 2026 · Todos los derechos reservados</span>
        <div className="flex gap-5">
          {["Instagram", "TikTok"].map((s) => (
            <a key={s} href="#" className="hover:text-niebla transition-colors">{s}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}