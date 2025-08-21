"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Marca {
  id: number;
  nombre: string;
  titular: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Cargar marcas
  const fetchMarcas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/marcas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error cargando marcas");
      const data = await res.json();
      setMarcas(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Borrar marca
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta marca?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/marcas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error eliminando marca");
      toast.success("Marca eliminada");
      fetchMarcas();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  // Columnas de la tabla
  const columns = [
    {
      name: "ID",
      selector: (row: Marca) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Nombre",
      selector: (row: Marca) => row.nombre,
      sortable: true,
    },
    {
      name: "Titular",
      selector: (row: Marca) => row.titular,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row: Marca) => (row.estado ? "Activo" : "Inactivo"),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: Marca) => (
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/marcas/${row.id}/editar`)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Marcas</h1>
        <button
          onClick={() => router.push("/marcas/nueva")}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Plus size={18} /> Nueva Marca
        </button>
      </div>

      <DataTable
        columns={columns}
        data={marcas}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
