"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import BottomNav from "@/components/BottomNav";
import LanzamientoCard from "@/components/LanzamientoCard";
import TocadaCard from "@/components/TocadaCard";
import RecuerdosGrid from "@/components/RecuerdosGrid";
import { listarTocadasPorCiudad } from "@/lib/api";
import {
    Lanzamiento,
    RecuerdoFoto,
    TocadaResponse
} from "@/lib/types";

const CIUDAD_LIMA = 1;

const LANZAMIENTOS_DEMO: Lanzamiento[] = [
    {
        id: "1",
        bandaNombre: "Suerte Campeón",
        titulo: "Suerte Campeón",
        tipo: "ALBUM",
        publicadoHace: "hace 1m"
    },
    {
        id: "2",
        bandaNombre: "Mundaka",
        titulo: "Sonata Tropical del Ártico",
        tipo: "ALBUM",
        publicadoHace: "hace 1y"
    }
];

const RECUERDOS_DEMO: RecuerdoFoto[] = [
    {
        id: "1",
        fotoUrl: "",
        tocadaTitulo: "Noche subte vol. 3"
    },
    {
        id: "2",
        fotoUrl: "",
        tocadaTitulo: "Fest. Barranco"
    },
    {
        id: "3",
        fotoUrl: "",
        tocadaTitulo: "Acustico centro"
    }
];

export default function FeedPage() {
    const [tocadas, setTocadas] = useState<TocadaResponse[]>([]);
    const [cargando, setCargando] = useState(true);
    const [errorApi, setErrorApi] = useState(false);

    useEffect(() => {
        const cargarTocadas = async () => {
            try {
                console.log("Cargando tocadas de Lima...");

                setCargando(true);
                setErrorApi(false);

                const data = await listarTocadasPorCiudad(CIUDAD_LIMA);

                console.log("Tocadas recibidas:", data);

                setTocadas(data);
            } catch (error) {
                console.error("Error cargando tocadas:", error);
                setErrorApi(true);
            } finally {
                setCargando(false);
            }
        };

        cargarTocadas();
    }, []);

    return (
        <>
            <Header ciudad="Lima" />
            <TabNav />

            <main className="bg-abismo min-h-screen px-5 py-5 space-y-6 pb-24">

                <section className="space-y-3">
                    <h2 className="font-[family-name:var(--font-bungee)] text-sm tracking-widest text-humo uppercase">
                        Recién lanzado
                    </h2>

                    {LANZAMIENTOS_DEMO.map((l) => (
                        <LanzamientoCard
                            key={l.id}
                            lanzamiento={l}
                        />
                    ))}
                </section>

                <div className="h-px bg-repeating-[linear-gradient(to_right,transparent_0,transparent_6px,rgba(237,233,224,0.08)_6px,rgba(237,233,224,0.08)_12px)]" />

                <section className="space-y-3">
                    <h2 className="font-[family-name:var(--font-bungee)] text-sm tracking-widest text-humo uppercase">
                        Próximas tocadas
                    </h2>

                    {cargando && (
                        <p className="font-mono text-xs text-humo/60">
                            Cargando tocadas...
                        </p>
                    )}

                    {!cargando && errorApi && (
                        <p className="font-mono text-xs text-humo/60">
                            no se pudo conectar con la API. revisa que el backend esté
                            corriendo en NEXT_PUBLIC_API_URL.
                        </p>
                    )}

                    {!cargando && !errorApi && tocadas.length === 0 && (
                        <p className="font-mono text-xs text-humo/60">
                            todavía no hay tocadas confirmadas en Lima.
                        </p>
                    )}

                    {!errorApi && (
                        <div className="space-y-3">
                            {tocadas.map((t) => (
                                <TocadaCard
                                    key={t.id}
                                    tocada={t}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <div className="h-px bg-repeating-[linear-gradient(to_right,transparent_0,transparent_6px,rgba(237,233,224,0.08)_6px,rgba(237,233,224,0.08)_12px)]" />

                <section className="space-y-3">
                    <h2 className="font-[family-name:var(--font-bungee)] text-sm tracking-widest text-humo uppercase">
                        Recuerdos
                    </h2>

                    <RecuerdosGrid fotos={RECUERDOS_DEMO} />
                </section>

            </main>

            <BottomNav />
        </>
    );
}