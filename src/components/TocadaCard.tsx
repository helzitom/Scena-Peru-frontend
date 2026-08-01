import { TocadaResponse } from "@/lib/types";

const ESTADO_ESTILO: Record<string, string> = {
  CONFIRMADA: "bg-teal-light text-teal-dark",
  TENTATIVA: "bg-amber-light text-amber-dark",
  CANCELADA: "bg-sand/40 text-ink/50",
  FINALIZADA: "bg-sand/40 text-ink/50"
};

function formatearFecha(fechaISO: string) {
  const fecha = new Date(fechaISO + "T00:00:00");
  return fecha.toLocaleDateString("es-PE", { weekday: "short", day: "numeric", month: "short" });
}

export default function TocadaCard({ tocada }: { tocada: TocadaResponse }) {
  return (
    <article className="border border-sand/60 rounded-2xl p-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="font-display tracking-wide text-lg leading-tight">{tocada.titulo}</p>
          <p className="font-mono text-xs text-ink/60 mt-1">
            {formatearFecha(tocada.fecha)} · {tocada.horaInicio.slice(0, 5)}
          </p>
        </div>
        <span
          className={`font-mono text-[11px] uppercase px-2 py-1 rounded-md whitespace-nowrap ${
            ESTADO_ESTILO[tocada.estado] ?? "bg-sand/40 text-ink/50"
          }`}
        >
          {tocada.estado.toLowerCase()}
        </span>
      </div>
    </article>
  );
}
