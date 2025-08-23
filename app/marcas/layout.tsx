"use client";

import { ReactNode } from "react";
import Sidebar from "./../../components/Sidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            <AuthProvider>
                <Sidebar />
            <div className="flex flex-col flex-1">
                    <Header />
                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                    {/* 👇 contenedor global de Toastify */}
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        draggable
                    />
            </div>
            </AuthProvider>
        </div>
    );
}
