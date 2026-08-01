import { RecuerdoFoto } from "@/lib/types";

const COLORES = ["bg-coral-light", "bg-teal-light", "bg-amber-light"];

export default function RecuerdosGrid({ fotos }: { fotos: RecuerdoFoto[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {fotos.map((foto, i) => (
        <div
          key={foto.id}
          className={`aspect-square rounded-xl flex items-end p-2 ${COLORES[i % COLORES.length]}`}
        >
          <p className="font-mono text-[10px] text-ink/60 leading-tight">{foto.tocadaTitulo}</p>
        </div>
      ))}
    </div>
  );
}
