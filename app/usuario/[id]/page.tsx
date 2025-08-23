"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { User, Mail } from "lucide-react";
import { API_URL } from "@/utils/api";

type Usuario = {
    id: number;
    nombre: string;
    correo: string;
};

export default function UsuarioPage() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No se encontró token de acceso");
            return;
        }

        if (id) {
            fetch(`${API_URL}/usuarios/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener usuario");
                    return res.json();
                })
                .then((data) => setUsuario(data))
                .catch((err) => setError(err.message));
        }
    }, [id]);

    if (error) {
        return (
            <div className="p-6 text-red-500 font-semibold">
                ⚠️ {error}
            </div>
        );
    }

    if (!usuario) {
        return <div className="p-6">Cargando usuario...</div>;
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" /> {usuario.nombre}
            </h1>
            <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" /> {usuario.correo}
            </p>

            {/* Botón regresar */}
            <div className="pt-4">
                <Link
                    href="/marcas"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Regresar
                </Link>
            </div>
        </div>
    );
}
