export type EstadoTocada = "CONFIRMADA" | "TENTATIVA" | "CANCELADA" | "FINALIZADA";
export type TipoUsuario = "FAN" | "BANDA" | "ORGANIZADOR";

export interface RegistroPayload {
  email: string;
  password: string;
  tipo: TipoUsuario;
  ciudadId: number;
  nombreDisplay: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TocadaResponse {
  id: string;
  titulo: string;
  ciudadId: number;
  fecha: string;
  horaInicio: string;
  estado: EstadoTocada;
  imagenFlyerUrl?: string;
}

export interface UsuarioResponse {
  id: string;
  email: string;
  tipo: "FAN" | "BANDA" | "ORGANIZADOR" | "ADMIN";
  nombreDisplay: string;
  verificado: boolean;
}

export interface CrearTocadaPayload {
  titulo: string;
  descripcion?: string;
  ciudadId: number;
  venueId?: number;
  ubicacionManual?: string;
  fecha: string;
  horaInicio: string;
  creadorTipo: "BANDA" | "ORGANIZADOR";
  creadorId: string;
  precioEntrada?: number;
  linkEntradas?: string;
  imagenFlyerUrl?: string;
}

// Lanzamientos y recuerdos aun no tienen endpoint en el backend (modulos
// "feed" y "recuerdos" quedaron como dominio de referencia) - se tipan aqui
// para que el reemplazo por datos reales sea directo cuando existan.
export interface Lanzamiento {
  id: string;
  bandaNombre: string;
  titulo: string;
  tipo: "SINGLE" | "EP" | "ALBUM" | "VIDEO";
  publicadoHace: string;
}

export interface RecuerdoFoto {
  id: string;
  fotoUrl: string;
  tocadaTitulo: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiraEnSegundos: number;
}

export interface Ciudad {
  id: number;
  nombre: string;
  departamento: string;
}