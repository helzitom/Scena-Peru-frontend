"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import BottomNav from "@/components/BottomNav";
import TocadaCard from "@/components/TocadaCard";
import { listarTocadasPorCiudad } from "@/lib/api";
import { TocadaResponse } from "@/lib/types";

const CIUDAD_LIMA = 1;

export default function TocadasPage() {
  const [tocadas, setTocadas] = useState<TocadaResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(false);

  useEffect(() => {
    listarTocadasPorCiudad(CIUDAD_LIMA)
      .then(setTocadas)
      .catch(() => setErrorApi(true))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <Header ciudad="Lima" />
      <TabNav />

      <main className="bg-abismo min-h-screen px-5 py-5 space-y-4 pb-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-bungee)] text-sm tracking-widest text-humo uppercase">
            Tocadas en tu ciudad
          </h2>
          <Link
            href="/publicar"
            className="font-[family-name:var(--font-bungee)] text-xs bg-rojo text-crema px-4 py-2 rounded whitespace-nowrap hover:bg-rojo/85 transition-colors"
          >
            + Publicar
          </Link>
        </div>

        {cargando && (
          <p className="font-mono text-xs text-humo/60">Cargando...</p>
        )}

        {!cargando && errorApi && (
          <p className="font-mono text-xs text-humo/60">
            no se pudo conectar con la API en NEXT_PUBLIC_API_URL.
          </p>
        )}

        {!cargando && !errorApi && tocadas.length === 0 && (
          <div className="border border-crema/10 rounded p-8 text-center space-y-4">
            <p className="font-mono text-xs text-humo/60">
              todavía no hay tocadas confirmadas en tu ciudad.
            </p>
            <Link
              href="/publicar"
              className="font-[family-name:var(--font-bungee)] text-xs bg-rojo text-crema px-5 py-2.5 rounded inline-block hover:bg-rojo/85 transition-colors"
            >
              Publica la primera
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {tocadas.map((t) => (
            <TocadaCard key={t.id} tocada={t} />
          ))}
        </div>
      </main>

      <BottomNav />
    </>
  );
}