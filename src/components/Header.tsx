"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cerrarSesion, obtenerSesion, SesionUsuario } from "@/lib/auth";

export default function Header({ ciudad = "Lima" }: { ciudad?: string }) {
  const router = useRouter();
  const [sesion, setSesion] = useState<SesionUsuario | null>(null);

  useEffect(() => {
    setSesion(obtenerSesion());
  }, []);

  function salir() {
    cerrarSesion();
    setSesion(null);
    router.push("/");
  }

  return (
    <header className="bg-coral text-paper px-5 md:px-10 pt-5 md:pt-8 pb-6 rounded-b-3xl md:rounded-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest uppercase">Scena · {ciudad}</span>
        <div className="flex items-center gap-4">
          {sesion ? (
            <button onClick={salir} className="font-mono text-xs underline underline-offset-2">
              Cerrar sesión
            </button>
          ) : (
            <Link href="/login" className="font-mono text-xs underline underline-offset-2">
              Iniciar sesión
            </Link>
          )}
          <span className="font-mono text-xs">🔔</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl mt-2 leading-none">La escena no se detiene</h1>
      <p className="text-sm mt-1 text-coral-light font-body max-w-md">
        {sesion ? `Hola, ${sesion.nombreDisplay}` : "bandas, tocadas y recuerdos de tu ciudad, en un solo lugar"}
      </p>
    </header>
  );
}