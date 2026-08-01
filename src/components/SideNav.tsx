"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cerrarSesion, obtenerSesion, SesionUsuario } from "@/lib/auth";

const LINKS = [
    { href: "/feed", label: "Feed" },
    { href: "/tocadas", label: "Tocadas" },
    { href: "/recuerdos", label: "Recuerdos" }
];

export default function SideNav() {
    const pathname = usePathname();
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
        <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 md:min-h-screen border-r border-sand/60 px-6 py-8">
            <Link href="/" className="font-display text-2xl tracking-wide text-coral">
                Scena Perú
            </Link>
            <nav className="flex flex-col gap-1 mt-10">
                {LINKS.map((link) => {
                    const activo = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-display uppercase tracking-wide text-sm px-3 py-2 rounded-lg ${activo ? "bg-coral text-paper" : "text-ink/70 hover:bg-sand/30"
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {sesion ? (
                <button
                    onClick={salir}
                    className="mt-auto font-mono text-xs uppercase underline underline-offset-2 text-ink/60 text-left"
                >
                    Cerrar sesión ({sesion.nombreDisplay})
                </button>
            ) : (
                <Link href="/login" className="mt-auto font-mono text-xs uppercase underline underline-offset-2 text-ink/60">
                    Iniciar sesión / Publicar tocada
                </Link>
            )}
        </aside>
    );
}