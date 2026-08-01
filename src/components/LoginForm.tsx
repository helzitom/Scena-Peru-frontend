"use client";

import { useState } from "react";
import { iniciarSesion, registrarUsuario } from "@/lib/api";
//xd
import { TipoUsuario } from "@/lib/types";

type Modo = "login" | "registro";

export default function LoginForm() {
    const [modo, setModo] = useState<Modo>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombreDisplay, setNombreDisplay] = useState("");
    const [tipo, setTipo] = useState<TipoUsuario>("FAN");
    const [estado, setEstado] = useState<{ tipo: "idle" | "cargando" | "ok" | "error"; mensaje?: string }>({
        tipo: "idle"
    });

    async function manejarSubmit(e: React.FormEvent) {
        e.preventDefault();
        setEstado({ tipo: "cargando" });
        try {
            if (modo === "registro") {
                // ciudadId fijo a Lima (1) por ahora; reemplazar por selector
                // real cuando exista GET /api/ciudades
                await registrarUsuario({ email, password, tipo, ciudadId: 1, nombreDisplay });
                setEstado({ tipo: "ok", mensaje: "Cuenta creada. Ya puedes iniciar sesión." });
                setModo("login");
            } else {
                await iniciarSesion({ email, password });
                setEstado({ tipo: "ok", mensaje: "Sesión iniciada." });
            }
        } catch (err) {
            setEstado({
                tipo: "error",
                mensaje:
                    modo === "login"
                        ? "El backend todavía no tiene login implementado (falta JWT). Prueba registrarte."
                        : (err as Error).message
            });
        }
    }

    return (
        <div className="max-w-sm">
            <div className="flex gap-2 mb-6">
                <button
                    type="button"
                    onClick={() => setModo("login")}
                    className={`font-display uppercase tracking-wide text-sm px-4 py-2 rounded-lg ${modo === "login" ? "bg-coral text-paper" : "bg-sand/20 text-ink/60"
                        }`}
                >
                    Iniciar sesión
                </button>
                <button
                    type="button"
                    onClick={() => setModo("registro")}
                    className={`font-display uppercase tracking-wide text-sm px-4 py-2 rounded-lg ${modo === "registro" ? "bg-coral text-paper" : "bg-sand/20 text-ink/60"
                        }`}
                >
                    Registrarme
                </button>
            </div>

            <form onSubmit={manejarSubmit} className="space-y-4">
                {modo === "registro" && (
                    <div>
                        <label className="font-mono text-xs uppercase text-ink/60">Nombre / nombre de banda</label>
                        <input
                            required
                            value={nombreDisplay}
                            onChange={(e) => setNombreDisplay(e.target.value)}
                            className="w-full mt-1 border border-sand/60 rounded-lg px-3 py-2 bg-white/50"
                        />
                    </div>
                )}

                <div>
                    <label className="font-mono text-xs uppercase text-ink/60">Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 border border-sand/60 rounded-lg px-3 py-2 bg-white/50"
                    />
                </div>

                <div>
                    <label className="font-mono text-xs uppercase text-ink/60">Contraseña</label>
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 border border-sand/60 rounded-lg px-3 py-2 bg-white/50"
                    />
                </div>

                {modo === "registro" && (
                    <div>
                        <label className="font-mono text-xs uppercase text-ink/60">Soy...</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as TipoUsuario)}
                            className="w-full mt-1 border border-sand/60 rounded-lg px-3 py-2 bg-white/50"
                        >
                            <option value="FAN">Fan</option>
                            <option value="BANDA">Banda</option>
                            <option value="ORGANIZADOR">Organizador / venue</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={estado.tipo === "cargando"}
                    className="w-full bg-coral text-paper font-display uppercase tracking-wide py-2 rounded-lg disabled:opacity-50"
                >
                    {estado.tipo === "cargando" ? "Enviando..." : modo === "login" ? "Entrar" : "Crear cuenta"}
                </button>

                {estado.mensaje && (
                    <p className={`font-mono text-xs ${estado.tipo === "error" ? "text-coral-dark" : "text-teal-dark"}`}>
                        {estado.mensaje}
                    </p>
                )}
            </form>
        </div>
    );
}