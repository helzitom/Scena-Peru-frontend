import { Lanzamiento } from "@/lib/types";

export default function LanzamientoCard({ lanzamiento }: { lanzamiento: Lanzamiento }) {
  return (
    <article className="border border-sand/60 rounded-2xl p-4 bg-white/40">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-amber-light flex items-center justify-center font-display text-xs text-amber-dark">
          {lanzamiento.bandaNombre.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium leading-none">{lanzamiento.bandaNombre}</p>
          <p className="font-mono text-[11px] text-ink/50">
            nuevo lanzamiento · {lanzamiento.publicadoHace}
          </p>
        </div>
      </div>
      <div className="bg-amber-light rounded-xl p-4 flex items-center gap-3">
        <span className="text-xl">▶</span>
        <div>
          <p className="font-display tracking-wide">{lanzamiento.titulo}</p>
          <p className="font-mono text-[11px] text-amber-dark uppercase">{lanzamiento.tipo}</p>
        </div>
      </div>
    </article>
  );
}
