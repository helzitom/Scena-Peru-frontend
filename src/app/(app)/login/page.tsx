import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const ROLES_INFO = [
    { nombre: "seguro para", color: "text-cian", texto: "Cada uno de tus seguidores y apoyo en la escena local" },
    { nombre: "prepárate", color: "text-amarillo", texto: "Para compartir tus sonidos, estilo y vibra por toda la región" },
    { nombre: "Ey tú!!", color: "text-fucsia", texto: "Aquí podrás promocionar todos tus eventos y contenido" }
];

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full bg-noche flex items-center justify-center px-4 py-10 relative overflow-hidden">
            {/* Resplandores decorativos, mismos tonos que la landing */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-fucsia/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cian/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl bg-paper rounded-3xl overflow-hidden lg:grid lg:grid-cols-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
                {/* Panel de marca: solo desde 1024px hacia arriba, para que no se parta raro en tablet */}
                <div className="hidden lg:flex lg:flex-col lg:justify-center bg-noche text-crema px-12 py-14">
                    <Link href="/" className="font-display text-2xl tracking-wide w-fit text-amarillo">
                        Scena Perú
                    </Link>
                    <h1 className="font-display text-4xl xl:text-5xl leading-none mt-8">
                        Únete
                        <br />a la escena
                    </h1>
                    <p className="text-sm text-crema/70 mt-4 max-w-xs">
                        Un solo lugar para bandas, seguidores, organizadores y locales del Perú.
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

                {/* Panel del formulario: siempre visible, todo el ancho en mobile/tablet */}
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <Link href="/" className="font-display text-xl tracking-wide text-coral lg:hidden mb-8">
                        Escena Perú
                    </Link>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}