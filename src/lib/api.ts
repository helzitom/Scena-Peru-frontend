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
