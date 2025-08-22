"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Marca {
    id: number;
    nombre: string;
    titular: string;
    estado: boolean;
    usuarios_id: number;
}

interface Usuario {
    id: number;
    nombre: string;
}

interface Props {
    marca: Marca;
    usuarios: Usuario[];
    onSuccess: () => void;
    onClose: () => void;
}

export default function ActualizarMarcaModal({ marca, usuarios, onSuccess, onClose }: Props) {
    const [nombre, setNombre] = useState(marca.nombre);
    const [titular, setTitular] = useState(marca.titular);
    const [estado, setEstado] = useState(marca.estado);
    const [usuariosId, setUsuariosId] = useState<number>(marca.usuarios_id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8081/marcas/${marca.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, titular, estado, usuarios_id: usuariosId }),
            });

            if (!res.ok) throw new Error("Error actualizando la marca");

            toast.success("Marca actualizada");
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
                <h2 className="text-lg font-bold">Editar Marca</h2>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={titular}
                    onChange={(e) => setTitular(e.target.value)}
                    className="w-full p-2 border rounded"
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
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
