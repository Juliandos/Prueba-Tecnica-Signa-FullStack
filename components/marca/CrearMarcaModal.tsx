"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/utils/api";


interface Usuario {
    id: number;
    nombre: string;
}

interface Props {
    usuarios: Usuario[];
    onSuccess: () => void;
    onClose: () => void;
}

export default function CrearMarcaModal({ usuarios, onSuccess, onClose }: Props) {
    const [nombre, setNombre] = useState("");
    const [titular, setTitular] = useState("");
    const [estado, setEstado] = useState(true);
    const [usuariosId, setUsuariosId] = useState<number>(usuarios[0]?.id || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/marcas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, titular, estado, usuarios_id: usuariosId }),
            });

            if (!res.ok) throw new Error("Error creando la marca");

            toast.success("Guardado con éxito!");
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error desconocido");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-96 space-y-4"
            >
                <h2 className="text-lg font-bold">Crear Marca</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Titular"
                    value={titular}
                    onChange={(e) => setTitular(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <label className="block">
                    Usuario asignado:
                    <select
                        className="w-full p-2 border rounded mt-1"
                        value={usuariosId}
                        onChange={(e) => setUsuariosId(Number(e.target.value))}
                    >
                        {usuarios.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={estado}
                        onChange={() => setEstado(!estado)}
                    />
                    Activo
                </label>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
