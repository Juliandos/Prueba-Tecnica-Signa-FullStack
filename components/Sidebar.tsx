"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { state } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-blue-600">Signa FullStack</h1>
      </div>

      <nav className="flex-1 p-4 space-y-3">
        <Link href="/marcas" className="block p-2 rounded hover:bg-gray-100">
          Marcas
        </Link>

        {state.user && (
          <Link
            href={`/usuario/${state.user.id}`}
            className={`block p-2 rounded hover:bg-gray-100 ${
              pathname.startsWith(`/usuario/`) ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Usuario
          </Link>
        )}
      </nav>
    </aside>
  );
}
