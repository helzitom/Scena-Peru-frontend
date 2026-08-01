import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import BottomNav from "@/components/BottomNav";
import LanzamientoCard from "@/components/LanzamientoCard";
import TocadaCard from "@/components/TocadaCard";
import RecuerdosGrid from "@/components/RecuerdosGrid";
import { listarTocadasPorCiudad } from "@/lib/api";
import { Lanzamiento, RecuerdoFoto } from "@/lib/types";

const CIUDAD_LIMA = 1;

// Datos de ejemplo: "feed" y "recuerdos" aun no tienen endpoint en el backend
// (quedaron como dominio de referencia) - se reemplazan por fetch real cuando existan.
const LANZAMIENTOS_DEMO: Lanzamiento[] = [
  { id: "1", bandaNombre: "La Colera", titulo: "Cielo de concreto", tipo: "SINGLE", publicadoHace: "hace 2h" },
  { id: "2", bandaNombre: "Rio Sagrado", titulo: "Altiplano", tipo: "EP", publicadoHace: "hace 1d" }
];

const RECUERDOS_DEMO: RecuerdoFoto[] = [
  { id: "1", fotoUrl: "", tocadaTitulo: "Noche subte vol. 3" },
  { id: "2", fotoUrl: "", tocadaTitulo: "Fest. Barranco" },
  { id: "3", fotoUrl: "", tocadaTitulo: "Acustico centro" }
];

export default async function FeedPage() {
  let tocadas = [];
  let errorApi = false;
  try {
    tocadas = await listarTocadasPorCiudad(CIUDAD_LIMA);
  } catch {
    errorApi = true;
  }

  return (
    <>
      <Header ciudad="Lima" />
      <TabNav />

      <main className="px-5 py-5 space-y-3">
        <section className="space-y-3">
          <h2 className="text-xl">Recien lanzado</h2>
          {LANZAMIENTOS_DEMO.map((l) => (
            <LanzamientoCard key={l.id} lanzamiento={l} />
          ))}
        </section>

        <div className="ticket-divider" />

        <section className="space-y-3">
          <h2 className="text-xl">Proximas tocadas</h2>
          {errorApi && (
            <p className="font-mono text-xs text-ink/50">
              no se pudo conectar con la API. revisa que el backend este corriendo en
              NEXT_PUBLIC_API_URL.
            </p>
          )}
          {!errorApi && tocadas.length === 0 && (
            <p className="font-mono text-xs text-ink/50">
              todavia no hay tocadas confirmadas en Lima.
            </p>
          )}
          {tocadas.map((t) => (
            <TocadaCard key={t.id} tocada={t} />
          ))}
        </section>

        <div className="ticket-divider" />

        <section className="space-y-3">
          <h2 className="text-xl">Recuerdos</h2>
          <RecuerdosGrid fotos={RECUERDOS_DEMO} />
        </section>
      </main>

      <BottomNav />
    </>
  );
}
