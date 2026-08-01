import { CrearTocadaPayload, TocadaResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function manejarRespuesta<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const texto = await res.text().catch(() => "");
    throw new Error(`Error ${res.status}: ${texto || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function listarTocadasPorCiudad(ciudadId: number): Promise<TocadaResponse[]> {
  const res = await fetch(`${API_URL}/api/tocadas?ciudadId=${ciudadId}`, {
    // las tocadas cambian seguido; evitamos cache estatico de Next
    cache: "no-store"
  });
  return manejarRespuesta<TocadaResponse[]>(res);
}

export async function crearTocada(payload: CrearTocadaPayload): Promise<TocadaResponse> {
  const res = await fetch(`${API_URL}/api/tocadas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return manejarRespuesta<TocadaResponse>(res);
}

import { RegistroPayload, LoginPayload, UsuarioResponse } from "./types";

// Conectado a POST /api/usuarios/registro (ya existe en tu backend)
export async function registrarUsuario(payload: RegistroPayload): Promise<UsuarioResponse> {
  const res = await fetch(`${API_URL}/api/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return manejarRespuesta<UsuarioResponse>(res);
}

// TODO backend: este endpoint aun no existe. "usuarios" necesita Spring
// Security + JWT (ver README del backend). El frontend ya queda listo
// para consumirlo apenas exista.
export async function iniciarSesion(payload: LoginPayload): Promise<{ token: string }> {
  const res = await fetch(`${API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return manejarRespuesta<{ token: string }>(res);
}
