import Link from "next/link";
import { Bungee, Work_Sans } from "next/font/google";

const bungee = Bungee({ weight: "400", subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const RAYOS = Array.from({ length: 24 });

export default function LandingPage() {
  return (
    <main className={`${workSans.className} bg-noche text-crema min-h-screen overflow-hidden`}>
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <span className={`${bungee.className} text-xl text-amarillo`}>SCENA PERÚ</span>
        <Link
          href="/login"
          className={`${bungee.className} text-xs md:text-sm bg-fucsia text-crema px-4 py-2 rounded-full`}
        >
          Entrar
        </Link>
      </header>

      <section className="relative px-6 md:px-12 pt-8 md:pt-16 pb-20 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 600 600" className="w-[140%] max-w-none opacity-40">
            {RAYOS.map((_, i) => {
              const angulo = (360 / RAYOS.length) * i;
              return (
                <line
                  key={i}
                  x1="300" y1="300" x2="300" y2="-100"
                  stroke={i % 2 === 0 ? "#F5C518" : "#22C7C7"}
                  strokeWidth="10"
                  transform={`rotate(${angulo} 300 300)`}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-10">
          <p className="font-medium text-cian tracking-widest uppercase text-xs md:text-sm mb-4">
            Lima · Arequipa · Trujillo
          </p>
          <h1 className={`${bungee.className} text-4xl md:text-7xl leading-[1.05] text-fucsia -rotate-2 inline-block`}>
            LA ESCENA
            <br />
            NO SE DETIENE
          </h1>
          <p className="mt-6 max-w-md mx-auto text-sm md:text-base text-crema/80">
            El punto de encuentro de bandas, fans, organizadores y locales del Perú.
            Tocadas confirmadas, horarios, lanzamientos y fotasos de cada noche, en un solo lugar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login" className={`${bungee.className} text-sm bg-amarillo text-noche px-6 py-3 rounded-full`}>
              Crear cuenta gratis
            </Link>
            <Link href="/feed" className={`${bungee.className} text-sm border-2 border-crema px-6 py-3 rounded-full`}>
              Ver eventos
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 pb-20 grid gap-4 md:grid-cols-3">
        {[
          { color: "bg-fucsia", title: "Bandas", texto: "Sube tu música, avisa tus tocadas y arma tu cartel." },
          { color: "bg-cian", title: "Seguidores", texto: "Descubre tocadas cerca de ti y guarda los recuerdos de cada noche." },
          { color: "bg-naranja", title: "Organizadores", texto: "Arma festivales, invita bandas y llena tu local." }
        ].map((item) => (
          <div key={item.title} className={`${item.color} rounded-3xl p-6 text-noche`}>
            <p className={`${bungee.className} text-2xl mb-2`}>{item.title}</p>
            <p className="text-sm">{item.texto}</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 px-6 md:px-12 py-8 text-center text-crema/50 text-xs">
        SCena Perú © 2026. Todos los derechos reservados. <br />
      </footer>
    </main>
  );
}