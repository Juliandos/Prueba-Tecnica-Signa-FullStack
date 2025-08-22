"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import CrearMarcaModal from "../../components/marca/CrearMarcaModal";
import ActualizarMarcaModal from "../../components/marca/ActualizarMarcaModal";
import BorrarMarcaModal from "../../components/marca/BorrarMarcaModal";

interface Marca {
  id: number;
  nombre: string;
  titular: string;
  estado: boolean;
  created_at: string;
  updated_at: string;
  usuarios_id: number; // relación con usuario
}

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState<Marca | null>(null);
  const [showBorrar, setShowBorrar] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  // 🔹 Diccionario de usuarios (id → nombre)
  const userMap: Record<number, string> = usuarios.reduce(
    (acc, u) => ({ ...acc, [u.id]: u.nombre }),
    {}
  );

  // Cargar marcas
  const fetchMarcas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8081/marcas/", {
        headers: { Authorization: `Bearer ${token}` },
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

  // Cargar usuarios
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8081/usuarios/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error cargando usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  useEffect(() => {
    fetchMarcas();
    fetchUsuarios();
  }, []);

  const columns = [
    { name: "ID", selector: (row: Marca) => row.id, sortable: true, width: "70px" },
    { name: "Nombre", selector: (row: Marca) => row.nombre, sortable: true },
    { name: "Titular", selector: (row: Marca) => row.titular, sortable: true },
    { name: "Estado", selector: (row: Marca) => (row.estado ? "Activo" : "Inactivo") },
    {
      name: "Usuario",
      selector: (row: Marca) => userMap[row.usuarios_id] || "Desconocido",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: Marca) => (
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditar(row)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setShowBorrar(row.id)}
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
          onClick={() => setShowCrear(true)}
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

      {showCrear && (
        <CrearMarcaModal
          usuarios={usuarios} // 🔑 le pasamos usuarios al modal para elegir
          onSuccess={fetchMarcas}
          onClose={() => setShowCrear(false)}
        />
      )}
      {showEditar && (
        <ActualizarMarcaModal
          marca={showEditar}
          usuarios={usuarios} // 🔑 para actualizar también
          onSuccess={fetchMarcas}
          onClose={() => setShowEditar(null)}
        />
      )}
      {showBorrar && (
        <BorrarMarcaModal
          id={showBorrar}
          onSuccess={fetchMarcas}
          onClose={() => setShowBorrar(null)}
        />
      )}
    </div>
  );
}
