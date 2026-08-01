<<<<<<< HEAD
# Escena Peru - Frontend

Next.js 14 (App Router) + TypeScript + Tailwind. Proyecto **separado** del
backend (`escena-peru-backend`) — se despliega aparte (ej. Vercel) y solo
consume la API REST por HTTP, sin compartir codigo.

## Sistema de diseno

Definido a partir del mockup aprobado (flyer xerox + tonos calidos andinos):

| Rol | Valor |
|---|---|
| Fondo (paper) | `#F7F1E8` |
| Texto (ink) | `#241A14` |
| Coral (accion principal / tocadas) | `#D85A30` |
| Amber (lanzamientos) | `#E8A23D` |
| Teal (recuerdos) | `#1D9E75` |
| Sand (bordes/divisores) | `#C7B9A3` |

Tipografia: **Bebas Neue** para titulares (display, mayusculas, tracking
amplio), **Inter** para cuerpo de texto, **Space Mono** para metadata
(fechas, horarios, estados) — le da un aire de talonario de entrada.

Elemento firma: el `.ticket-divider` — un divisor con muescas circulares
que imita el borde perforado de una entrada de concierto, usado entre
secciones del feed.

## Requisitos
- Node 18+
- El backend corriendo (ver `escena-peru-backend/README.md`)

## Configuracion

```bash
cp .env.local.example .env.local
# edita NEXT_PUBLIC_API_URL si el backend no esta en localhost:8080
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Que esta conectado a la API real vs. demo

| Seccion | Estado |
|---|---|
| Tocadas (feed y pagina /tocadas) | conectado a `GET /api/tocadas?ciudadId=` |
| Lanzamientos | datos de ejemplo — el modulo `feed` del backend aun no expone endpoint |
| Recuerdos | datos de ejemplo — el modulo `recuerdos` del backend aun no expone endpoint |
| Registro / login | no incluido en este corte — falta pantalla + integrar con `POST /api/usuarios/registro` |
| Mapa de tocadas | la pagina /tocadas es un listado ordenado por fecha; falta integrar Mapbox/Google Maps con lat/long de cada tocada |

## Estructura

```
src/
  app/
    layout.tsx        fuentes (Bebas Neue, Inter, Space Mono) + shell mobile-first
    page.tsx           feed principal (home)
    tocadas/page.tsx    listado de tocadas por ciudad
    recuerdos/page.tsx  grilla de fotos
  components/          Header, TabNav, BottomNav, TocadaCard, LanzamientoCard, RecuerdosGrid
  lib/
    api.ts              cliente fetch hacia el backend
    types.ts            tipos que reflejan los DTOs del backend
```

## Siguientes pasos sugeridos
- Pantalla de registro/login conectada a `POST /api/usuarios/registro`.
- Pantalla `/publicar` para que una banda u organizador cree una tocada
  (`POST /api/tocadas`), reutilizando `crearTocada()` de `lib/api.ts`.
- Conectar el WebSocket de notificaciones (`/ws`, topic `/topic/ciudad/{id}`)
  para que "Proximas tocadas" se actualice en vivo sin refrescar.
- Reemplazar los arrays `_DEMO` de lanzamientos y recuerdos apenas el backend
  exponga esos endpoints.
=======
# Scena-Peru-frontend
>>>>>>> 688b7809dea15424a753b911f5cf544b16c29a13
