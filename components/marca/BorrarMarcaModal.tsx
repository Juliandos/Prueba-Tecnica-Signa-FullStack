"use client";

import toast from "react-hot-toast";

interface Props {
    id: number;
    onSuccess: () => void;
    onClose: () => void;
}

export default function BorrarMarcaModal({ id, onSuccess, onClose }: Props) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8081/marcas/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error eliminando la marca");

            toast.success("Marca eliminada correctamente");
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error desconocido");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96 space-y-4">
                <h2 className="text-lg font-bold">Eliminar Marca</h2>
                <p>¿Seguro que deseas eliminar esta marca?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
