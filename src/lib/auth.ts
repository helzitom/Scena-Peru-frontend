"use client";

const COOKIE_NAME = "escena_session";

export interface SesionUsuario {
    email: string;
    nombreDisplay: string;
    tipo: string;
}

// Placeholder: guarda un objeto plano en cookie. Cuando el backend tenga
// Spring Security + JWT, este archivo es el UNICO que cambia — aqui se
// guardaria el token firmado en vez de este objeto.
export function guardarSesion(usuario: SesionUsuario) {
    const valor = encodeURIComponent(JSON.stringify(usuario));
    document.cookie = `${COOKIE_NAME}=${valor}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function obtenerSesion(): SesionUsuario | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match[1]));
    } catch {
        return null;
    }
}

export function cerrarSesion() {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}