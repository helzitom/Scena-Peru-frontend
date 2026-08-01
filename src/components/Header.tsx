export default function Header({ ciudad = "Lima" }: { ciudad?: string }) {
  return (
    <header className="bg-coral text-paper px-5 pt-5 pb-6 rounded-b-3xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest uppercase">
          Escena · {ciudad}
        </span>
        <span className="font-mono text-xs">🔔</span>
      </div>
      <h1 className="text-4xl mt-2 leading-none">La escena no se detiene</h1>
      <p className="text-sm mt-1 text-coral-light font-body">
        bandas, tocadas y recuerdos de tu ciudad, en un solo lugar
      </p>
    </header>
  );
}
