"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cerrarSesion, obtenerPerfil } from "@/lib/api";
import { haySesion } from "@/lib/auth";
import { UsuarioResponse } from "@/lib/types";

export default function Header({ ciudad = "Lima" }: { ciudad?: string }) {
  const router = useRouter();
  const [perfil, setPerfil] = useState<UsuarioResponse | null>(null);

  useEffect(() => {
    if (haySesion()) {
      obtenerPerfil().then(setPerfil).catch(() => setPerfil(null));
    }
  }, []);

  async function salir() {
    await cerrarSesion();
    setPerfil(null);
    router.push("/");
  }

  return (
    <header className="bg-coral text-paper px-5 md:px-10 pt-5 md:pt-8 pb-6 rounded-b-3xl md:rounded-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest uppercase">Subsuelo · {ciudad}</span>
        <div className="flex items-center gap-4">
          {perfil ? (
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
        {perfil ? `Hola, ${perfil.nombreDisplay}` : "bandas, tocadas y recuerdos de tu ciudad, en un solo lugar"}
      </p>
    </header>
  );
}