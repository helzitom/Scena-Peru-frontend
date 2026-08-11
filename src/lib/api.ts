import { CrearTocadaPayload, LoginPayload, RegistroPayload, TocadaResponse, TokenResponse, UsuarioResponse, Ciudad } from "./types";
import { guardarTokens, limpiarSesion, obtenerAccessToken, obtenerRefreshToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function manejarRespuesta<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const texto = await res.text().catch(() => "");
    throw new Error(`Error ${res.status}: ${texto || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Envuelve fetch agregando el access token y reintentando una vez con
// refresh si el backend responde 401 (token expirado a los 15 min).
async function fetchAutenticado(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const accessToken = obtenerAccessToken();
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  let res = await fetch(input, { ...init, headers, cache: "no-store" });

  if (res.status === 401) {
    const refrescado = await intentarRefrescar();
    if (refrescado) {
      headers.set("Authorization", `Bearer ${obtenerAccessToken()}`);
      res = await fetch(input, { ...init, headers, cache: "no-store" });
    } else {
      limpiarSesion();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
  }

  return res;
}

async function intentarRefrescar(): Promise<boolean> {
  const refreshToken = obtenerRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) return false;
    const data: TokenResponse = await res.json();
    guardarTokens(data);
    return true;
  } catch {
    return false;
  }
}

// --- Endpoints publicos (sin token) ---

export async function listarCiudades(): Promise<Ciudad[]> {
  const res = await fetch(`${API_URL}/api/ciudades`, { cache: "no-store" });
  return manejarRespuesta<Ciudad[]>(res);
}


export async function registrarUsuario(payload: RegistroPayload): Promise<UsuarioResponse> {
  const res = await fetch(`${API_URL}/api/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return manejarRespuesta<UsuarioResponse>(res);
}

export async function iniciarSesion(payload: LoginPayload): Promise<TokenResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await manejarRespuesta<TokenResponse>(res);
  guardarTokens(data);
  return data;
}

export async function cerrarSesion(): Promise<void> {
  const refreshToken = obtenerRefreshToken();
  limpiarSesion();
  if (!refreshToken) return;
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });
  } catch {
    // si falla el logout en el backend, la sesion local ya quedo limpia igual
  }
}

// --- Endpoints protegidos (requieren token) ---

export async function obtenerPerfil(): Promise<UsuarioResponse> {
  const res = await fetchAutenticado(`${API_URL}/api/usuarios/me`);
  return manejarRespuesta<UsuarioResponse>(res);
}

export async function listarTocadasPorCiudad(ciudadId: number): Promise<TocadaResponse[]> {
  const res = await fetchAutenticado(`${API_URL}/api/tocadas?ciudadId=${ciudadId}`);
  return manejarRespuesta<TocadaResponse[]>(res);
}

export async function crearTocada(payload: CrearTocadaPayload): Promise<TocadaResponse> {
  const res = await fetchAutenticado(`${API_URL}/api/tocadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return manejarRespuesta<TocadaResponse>(res);
}
