"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { crearTocada, listarCiudades, obtenerPerfil } from "@/lib/api";
import { Ciudad, UsuarioResponse } from "@/lib/types";
import { subirFlyer } from "@/lib/supabase";
import { recortarParaFlyer } from "@/lib/image";


export default function PublicarTocadaForm() {
    const router = useRouter();
    const [perfil, setPerfil] = useState<UsuarioResponse | null>(null);
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [cargandoContexto, setCargandoContexto] = useState(true);

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ciudadId, setCiudadId] = useState<number | null>(null);
    const [ubicacionManual, setUbicacionManual] = useState("");
    const [fecha, setFecha] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [precioEntrada, setPrecioEntrada] = useState("");
    const [linkEntradas, setLinkEntradas] = useState("");

    const [flyerArchivo, setFlyerArchivo] = useState<File | null>(null);
    const [flyerPreview, setFlyerPreview] = useState<string | null>(null);
    const [subiendoFlyer, setSubiendoFlyer] = useState(false);

    const [procesandoFlyer, setProcesandoFlyer] = useState(false);
    const [flyerBlob, setFlyerBlob] = useState<Blob | null>(null);

    const [estado, setEstado] = useState<{ tipo: "idle" | "cargando" | "error"; mensaje?: string }>({
        tipo: "idle"
    });

    useEffect(() => {
        Promise.all([obtenerPerfil(), listarCiudades()])
            .then(([p, c]) => {
                setPerfil(p);
                setCiudades(c);
                setCiudadId(c[0]?.id ?? null);
            })
            .catch(() => setEstado({ tipo: "error", mensaje: "No se pudo cargar tu perfil. Inicia sesión de nuevo." }))
            .finally(() => setCargandoContexto(false));
    }, []);


    async function manejarSeleccionFlyer(e: React.ChangeEvent<HTMLInputElement>) {
        const archivo = e.target.files?.[0];
        if (!archivo) return;

        setProcesandoFlyer(true);
        try {
            const recortado = await recortarParaFlyer(archivo);
            setFlyerBlob(recortado);
            setFlyerPreview(URL.createObjectURL(recortado));
        } catch {
            setEstado({ tipo: "error", mensaje: "No se pudo procesar esa imagen, prueba con otra." });
        } finally {
            setProcesandoFlyer(false);
        }
    }

    async function manejarSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!perfil || !ciudadId) return;


        setEstado({ tipo: "cargando" });
        try {
            let imagenFlyerUrl: string | undefined;
            if (flyerBlob) {
                setSubiendoFlyer(true);
                imagenFlyerUrl = await subirFlyer(flyerBlob);
                setSubiendoFlyer(false);
            }

            const tocada = await crearTocada({
                titulo,
                descripcion: descripcion || undefined,
                ciudadId,
                ubicacionManual: ubicacionManual || undefined,
                fecha,
                horaInicio: `${horaInicio}:00`,
                creadorTipo: perfil.tipo === "ORGANIZADOR" ? "ORGANIZADOR" : "BANDA",
                creadorId: perfil.id,
                precioEntrada: precioEntrada ? Number(precioEntrada) : undefined,
                linkEntradas: linkEntradas || undefined,
                imagenFlyerUrl
            });
            router.push("/tocadas");
        } catch (err) {
            setSubiendoFlyer(false);
            setEstado({ tipo: "error", mensaje: (err as Error).message });
        }
    }

    if (cargandoContexto) {
        return <p className="font-mono text-xs text-ink/50">Cargando...</p>;
    }

    // Un FAN no crea tocadas - el backend tampoco lo permitiria (403), asi
    // que evitamos que llegue a intentarlo.
    if (perfil && perfil.tipo === "FAN") {
        return (
            <div className="bg-amber-light text-amber-dark rounded-xl px-4 py-3 text-sm max-w-md">
                Solo bandas y organizadores pueden publicar tocadas. Si tienes una banda o
                organizas eventos, actualiza tu cuenta o crea una nueva con ese rol.
            </div>
        );
    }

    return (
        <form onSubmit={manejarSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Título</label>
                <input
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej. Noche subte vol. 4"
                    className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                />
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={3}
                    placeholder="Cuéntale a la escena de qué se trata"
                    className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                />
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Ciudad</label>
                <select
                    required
                    value={ciudadId ?? ""}
                    onChange={(e) => setCiudadId(Number(e.target.value))}
                    className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                >
                    {ciudades.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                    Lugar (venue o dirección libre)
                </label>
                <input
                    required
                    value={ubicacionManual}
                    onChange={(e) => setUbicacionManual(e.target.value)}
                    placeholder="Ej. Jr. de la Unión, Cercado de Lima"
                    className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Fecha</label>
                    <input
                        required
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                    />
                </div>
                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Hora</label>
                    <input
                        required
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                        Precio (S/, opcional)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={precioEntrada}
                        onChange={(e) => setPrecioEntrada(e.target.value)}
                        placeholder="Libre"
                        className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                    />
                </div>
                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                        Link de entradas (opcional)
                    </label>
                    <input
                        type="url"
                        value={linkEntradas}
                        onChange={(e) => setLinkEntradas(e.target.value)}
                        placeholder="https://..."
                        className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                    />
                </div>
            </div>

            <div>
                <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                    Flyer (opcional)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={manejarSeleccionFlyer}
                    disabled={procesandoFlyer}
                    className="w-full mt-1.5 text-xs font-mono file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-coral file:text-paper file:font-display file:uppercase file:tracking-wide file:text-xs disabled:opacity-50"
                />
                {procesandoFlyer && <p className="font-mono text-[11px] text-ink/50 mt-1.5">Ajustando al formato de post...</p>}
                {flyerPreview && !procesandoFlyer && (
                    <img src={flyerPreview} alt="Vista previa del flyer" className="mt-3 rounded-xl w-full aspect-[4/5] object-cover" />
                )}
            </div>

            <button
                type="submit"
                disabled={estado.tipo === "cargando"}
                className="w-full bg-coral text-paper font-display uppercase tracking-wide py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
                {estado.tipo === "cargando" && (
                    <span className="w-3.5 h-3.5 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                )}
                {estado.tipo === "cargando" ? "Publicando..." : "Publicar tocada"}
                {estado.tipo === "cargando" ? (subiendoFlyer ? "Subiendo flyer..." : "Publicando...") : "Publicar tocada"}
            </button>

            {estado.tipo === "error" && (
                <div className="rounded-xl px-3.5 py-2.5 text-xs font-mono bg-coral/10 text-coral-dark flex items-start gap-2">
                    <span>⚠</span>
                    <span>{estado.mensaje}</span>
                </div>
            )}


        </form>
    );
}