import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const ROLES_INFO = [
    { nombre: "Fans", color: "text-cian", texto: "Descubre tocadas cerca tuyo y guarda los recuerdos de cada noche." },
    { nombre: "Bandas", color: "text-amarillo", texto: "Sube tu música, avisa tus fechas y arma tu propio cartel." },
    { nombre: "Organizadores", color: "text-fucsia", texto: "Crea festivales, invita bandas y llena tu local." }
];

const MENSAJES_REDIRECT: Record<string, string> = {
    "/tocadas": "Inicia sesión para ver las tocadas de tu ciudad",
    "/recuerdos": "Inicia sesión para ver los recuerdos de la escena"
};

export default function LoginPage({ searchParams }: { searchParams: { redirect?: string } }) {
    const mensaje = searchParams.redirect ? MENSAJES_REDIRECT[searchParams.redirect] : null;

    return (
        <div className="min-h-screen w-full bg-noche flex items-center justify-center px-4 py-10 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-fucsia/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cian/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl bg-paper rounded-3xl overflow-hidden lg:grid lg:grid-cols-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
                <div className="hidden lg:flex lg:flex-col lg:justify-center bg-noche text-crema px-12 py-14">
                    <Link href="/" className="font-display text-2xl tracking-wide w-fit text-amarillo">
                        Escena Perú
                    </Link>
                    <h1 className="font-display text-4xl xl:text-5xl leading-none mt-8">
                        Únete
                        <br />a la escena
                    </h1>
                    <p className="text-sm text-crema/70 mt-4 max-w-xs">
                        Un solo lugar para bandas, fans, organizadores y locales del Perú.
                    </p>

                    <div className="h-px bg-crema/15 my-8" />

                    <ul className="space-y-4">
                        {ROLES_INFO.map((r) => (
                            <li key={r.nombre}>
                                <p className={`font-display tracking-wide text-lg ${r.color}`}>{r.nombre}</p>
                                <p className="text-xs text-crema/60">{r.texto}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <Link href="/" className="font-display text-xl tracking-wide text-coral lg:hidden mb-8">
                        Escena Perú
                    </Link>

                    {mensaje && (
                        <div className="mb-6 bg-amber-light text-amber-dark text-xs font-mono px-3.5 py-2.5 rounded-xl">
                            🔒 {mensaje}
                        </div>
                    )}

                    <LoginForm />
                </div>
            </div>
        </div>
    );
}