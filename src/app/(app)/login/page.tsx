import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Header ciudad="Lima" />
            <main className="px-5 md:px-10 py-8">
                <h2 className="text-xl mb-6">Entra a la escena</h2>
                <LoginForm />
            </main>
        </>
    );
}