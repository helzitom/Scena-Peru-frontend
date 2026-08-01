import SideNav from "@/components/SideNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="md:flex md:min-h-screen">
            <SideNav />
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md md:max-w-2xl min-h-screen pb-20 md:pb-10">
                    {children}
                </div>
            </div>
        </div>
    );
}