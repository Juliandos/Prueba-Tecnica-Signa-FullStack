import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";


export default function UsuarioLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <AuthProvider>
                    <Header />
                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                </AuthProvider>
            </div>
        </div>
    );
}
