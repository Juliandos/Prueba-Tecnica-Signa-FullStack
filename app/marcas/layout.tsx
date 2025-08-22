// components/Layout.tsx
import { ReactNode } from "react";
import Sidebar from './../../components/Sidebar';
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <AuthProvider>
                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                </AuthProvider>
            </div>
        </div>
    );
}
