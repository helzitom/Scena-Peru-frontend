import Header from "@/components/Header";
import PublicarTocadaForm from "@/components/PublicarTocadaForm";

export default function PublicarPage() {
    return (
        <>
            <Header ciudad="Lima" />
            <main className="px-5 md:px-10 py-8">
                <h2 className="text-xl mb-1">Publica una tocada</h2>
                <p className="text-sm text-ink/60 mb-6">
                    Autogestiona tu propio show o arma el cartel completo de un festival.
                </p>
                <PublicarTocadaForm />
            </main>
        </>
    );
}