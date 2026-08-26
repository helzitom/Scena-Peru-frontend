import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import BottomNav from "@/components/BottomNav";
import RecuerdosGrid from "@/components/RecuerdosGrid";
import { RecuerdoFoto } from "@/lib/types";

const RECUERDOS_DEMO: RecuerdoFoto[] = [
  { id: "1", fotoUrl: "", tocadaTitulo: "Noche subte vol. 3" },
  { id: "2", fotoUrl: "", tocadaTitulo: "Fest. Barranco" },
  { id: "3", fotoUrl: "", tocadaTitulo: "Acustico centro" },
  { id: "4", fotoUrl: "", tocadaTitulo: "Cumbia en el parque" },
  { id: "5", fotoUrl: "", tocadaTitulo: "Metal fest Lima" },
  { id: "6", fotoUrl: "", tocadaTitulo: "Huayno nocturno" },
];

export default function RecuerdosPage() {
  return (
    <>
      <Header ciudad="Lima" />
      <TabNav />

      <main className="bg-abismo min-h-screen px-5 py-5 space-y-4 pb-24">
        <div>
          <h2 className="font-[family-name:var(--font-bungee)] text-sm tracking-widest text-humo uppercase">
            Recuerdos de la escena
          </h2>
          <p className="font-mono text-[10px] text-humo/50 mt-1">
            fotos compartidas por fans y bandas en cada tocada
          </p>
        </div>

        <RecuerdosGrid fotos={RECUERDOS_DEMO} />
      </main>

      <BottomNav />
    </>
  );
}