import { ReactNode } from "react";

export default function UsuarioLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                {children}
            </div>
        </div>
    );
}
