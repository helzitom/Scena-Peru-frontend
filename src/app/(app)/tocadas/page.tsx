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

      <main className="px-5 py-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl">Tocadas en tu ciudad</h2>
          <Link
            href="/publicar"
            className="font-display uppercase tracking-wide text-xs bg-coral text-paper px-4 py-2 rounded-full whitespace-nowrap"
          >
            + Publicar
          </Link>
        </div>

        {cargando && <p className="font-mono text-xs text-ink/50">Cargando...</p>}

        {!cargando && errorApi && (
          <p className="font-mono text-xs text-ink/50">
            no se pudo conectar con la API en NEXT_PUBLIC_API_URL.
          </p>
        )}
        {!cargando && !errorApi && tocadas.length === 0 && (
          <div className="border border-dashed border-sand/60 rounded-2xl p-6 text-center">
            <p className="font-mono text-xs text-ink/50 mb-3">
              todavía no hay tocadas confirmadas en tu ciudad.
            </p>
            <Link
              href="/publicar"
              className="font-display uppercase tracking-wide text-xs bg-coral text-paper px-4 py-2 rounded-full inline-block"
            >
              Publica la primera
            </Link>
          </div>
        )}
        {tocadas.map((t) => (
          <TocadaCard key={t.id} tocada={t} />
        ))}
      </main>

      <BottomNav />
    </>
  );
}