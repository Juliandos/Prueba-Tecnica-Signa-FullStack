"use client"

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link href="/marcas" className="block p-2 rounded hover:bg-gray-100">
          Marcas
        </Link>
        <Link href="/marcas/nueva" className="block p-2 rounded hover:bg-gray-100">
          Nueva Marca
        </Link>
        <Link href="/configuracion" className="block p-2 rounded hover:bg-gray-100">
          Configuración
        </Link>
      </nav>
    </aside>
  );
}
