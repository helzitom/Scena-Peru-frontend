import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import BottomNav from "@/components/BottomNav";
import TocadaCard from "@/components/TocadaCard";
import { listarTocadasPorCiudad } from "@/lib/api";

const CIUDAD_LIMA = 1;

export default async function TocadasPage() {
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
        {/* El mapa real (Mapbox/Google Maps) se conecta aqui usando
            latitud/longitud de cada tocada; por ahora es un listado
            ordenado por fecha, ya funcional contra la API. */}
        <h2 className="text-xl">Tocadas en tu ciudad</h2>

        {errorApi && (
          <p className="font-mono text-xs text-ink/50">
            no se pudo conectar con la API en NEXT_PUBLIC_API_URL.
          </p>
        )}
        {!errorApi && tocadas.length === 0 && (
          <p className="font-mono text-xs text-ink/50">
            todavia no hay tocadas confirmadas. crea la primera desde /publicar.
          </p>
        )}
        {tocadas.map((t) => (
          <TocadaCard key={t.id} tocada={t} />
        ))}
      </main>

      <BottomNav />
    </>
  );
}
