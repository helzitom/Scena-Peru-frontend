"use client";

const ACCESS_KEY = "escena_access_token";
const REFRESH_KEY = "escena_refresh_token";
// Cookie liviana SOLO como bandera para que el middleware (que corre en el
// edge, sin acceso a localStorage) sepa si hay sesion. El token real nunca
// va en esta cookie.
const FLAG_COOKIE = "escena_auth";

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export function guardarTokens(tokens: Tokens) {
    localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    document.cookie = `${FLAG_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function obtenerAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
}

export function obtenerRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
}

export function limpiarSesion() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    document.cookie = `${FLAG_COOKIE}=; path=/; max-age=0`;
}

export function haySesion(): boolean {
    return obtenerAccessToken() !== null;
}