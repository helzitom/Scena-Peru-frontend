"use client";

import { useState } from "react";
import { registrarUsuario, iniciarSesion } from "@/lib/api";
import { TipoUsuario } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";
import { haySesion } from "@/lib/auth";

type Modo = "login" | "registro";

const ROLES: { valor: TipoUsuario; label: string; color: string; bg: string }[] = [
    { valor: "FAN", label: "Fan", color: "text-coral-dark", bg: "border-coral bg-coral/10" },
    { valor: "BANDA", label: "Banda", color: "text-amber-dark", bg: "border-amber bg-amber/10" },
    { valor: "ORGANIZADOR", label: "Organizador", color: "text-teal-dark", bg: "border-teal bg-teal/10" }
];

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [nombreDisplay, setNombreDisplay] = useState("");
    const [tipo, setTipo] = useState<TipoUsuario>("FAN");
    const [estado, setEstado] = useState<{ tipo: "idle" | "cargando" | "ok" | "error"; mensaje?: string }>({
        tipo: "idle"
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const destino = searchParams.get("redirect") || "/feed";


    useEffect(() => {
        if (haySesion()) {
            router.push(destino);
        }
    }, []);

    const [modo, setModo] = useState<Modo>("login");

    async function manejarSubmit(e: React.FormEvent) {
        e.preventDefault();
        setEstado({ tipo: "cargando" });
        try {
            if (modo === "registro") {
                await registrarUsuario({ email, password, tipo, ciudadId: 1, nombreDisplay });
                // el registro no devuelve tokens - hacemos login automatico despues
                await iniciarSesion({ email, password });
                setEstado({ tipo: "ok", mensaje: "Cuenta creada. Entrando..." });
                router.push(destino);
            } else {
                await iniciarSesion({ email, password });
                setEstado({ tipo: "ok", mensaje: "Sesión iniciada." });
                router.push(destino);
            }
        } catch (err) {
            setEstado({ tipo: "error", mensaje: (err as Error).message });
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <h2 className="font-display text-2xl tracking-wide mb-1">
                {modo === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
            </h2>
            <p className="text-sm text-ink/60 mb-6">
                {modo === "login"
                    ? "Entra para ver tus tocadas y bandas seguidas."
                    : "Elige quién eres para personalizar tu perfil."}
            </p>

            <div className="flex gap-1 mb-6 bg-sand/20 rounded-full p-1 w-fit">
                <button
                    type="button"
                    onClick={() => setModo("login")}
                    className={`font-display uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-colors ${modo === "login" ? "bg-coral text-paper" : "text-ink/50"
                        }`}
                >
                    Iniciar sesión
                </button>
                <button
                    type="button"
                    onClick={() => setModo("registro")}
                    className={`font-display uppercase tracking-wide text-xs px-4 py-2 rounded-full transition-colors ${modo === "registro" ? "bg-coral text-paper" : "text-ink/50"
                        }`}
                >
                    Registrarme
                </button>
            </div>

            <form onSubmit={manejarSubmit} className="space-y-4">
                {modo === "registro" && (
                    <>
                        <div>
                            <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                                Soy...
                            </label>
                            <div className="grid grid-cols-3 gap-2 mt-1.5">
                                {ROLES.map((r) => (
                                    <button
                                        type="button"
                                        key={r.valor}
                                        onClick={() => setTipo(r.valor)}
                                        className={`border rounded-xl py-2.5 text-xs font-display tracking-wide uppercase transition-colors ${tipo === r.valor ? `${r.bg} ${r.color}` : "border-sand/60 text-ink/50"
                                            }`}
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                                {tipo === "BANDA" ? "Nombre de la banda" : "Nombre"}
                            </label>
                            <input
                                required
                                value={nombreDisplay}
                                onChange={(e) => setNombreDisplay(e.target.value)}
                                placeholder={tipo === "BANDA" ? "Ej. Sonido Subte" : "Ej. María Torres"}
                                className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-shadow"
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full mt-1.5 border border-sand/60 rounded-xl px-3.5 py-2.5 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-shadow"
                    />
                </div>

                <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Contraseña</label>
                    <div className="relative mt-1.5">
                        <input
                            required
                            type={mostrarPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-sand/60 rounded-xl px-3.5 py-2.5 pr-16 bg-white/60 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 transition-shadow"
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase text-ink/50"
                        >
                            {mostrarPassword ? "Ocultar" : "Ver"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={estado.tipo === "cargando"}
                    className="w-full bg-coral text-paper font-display uppercase tracking-wide py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                    {estado.tipo === "cargando" && (
                        <span className="w-3.5 h-3.5 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                    )}
                    {estado.tipo === "cargando" ? "Enviando..." : modo === "login" ? "Entrar" : "Crear cuenta"}
                </button>

                {estado.mensaje && (
                    <div
                        className={`rounded-xl px-3.5 py-2.5 text-xs font-mono flex items-start gap-2 ${estado.tipo === "error" ? "bg-coral/10 text-coral-dark" : "bg-teal-light text-teal-dark"
                            }`}
                    >
                        <span>{estado.tipo === "error" ? "⚠" : "✓"}</span>
                        <span>{estado.mensaje}</span>
                    </div>
                )}
            </form>
        </div>
    );
}