"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Mail, Phone } from "lucide-react";

type Usuario = {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
};

export default function UsuarioPage() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/usuario/${id}`)
                .then((res) => res.json())
                .then((data) => setUsuario(data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    if (!usuario) {
        return <p className="text-gray-500 text-center">Cargando usuario...</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                {usuario.nombre}
            </h1>

            <div className="space-y-4">
                <p className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-green-600" />
                    {usuario.email}
                </p>

                {usuario.telefono && (
                    <p className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-purple-600" />
                        {usuario.telefono}
                    </p>
                )}
            </div>
        </div>
    );
}
