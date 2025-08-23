"use client";
import { useEffect, useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/utils/api";
import { useAuth } from "@/context/AuthContext"; // 👈 importamos el contexto

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
}

export default function Header() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const { logoutNow } = useAuth(); // 👈 obtenemos la función logoutNow

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem("token");
                const correo = localStorage.getItem("correo");

                if (!token || !correo) return;

                const res = await fetch(`${API_URL}/usuarios`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Error obteniendo usuarios");

                const data: Usuario[] = await res.json();
                const user = data.find((u) => u.correo === correo);
                console.log("Prueba");
                
                if (user) setUsuario(user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsuario();
    }, []);

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
            <button className="md:hidden p-2">
                <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center gap-4">
                {usuario && (
                    <span className="text-gray-700 text-sm">ID: {usuario.id}</span>
                )}
                <Link
                    href={`/usuario/${usuario?.id}`}
                    className="block p-2 rounded hover:bg-gray-100"
                >
                    <User className="w-6 h-6 text-gray-600 cursor-pointer" />
                </Link>
                {/* 👇 botón logout con función manual */}
                <button onClick={logoutNow}>
                    <LogOut className="w-6 h-6 text-red-500 cursor-pointer" />
                </button>
            </div>
        </header>
    );
}
