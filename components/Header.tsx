"use client";
import { Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { state, logoutNow } = useAuth();

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
            <button className="md:hidden p-2">
                <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>

            <div className="flex items-center gap-4">
                {state.user && (
                    <>
                        <span className="text-gray-700 text-sm">
                            ID: {state.user.id}
                        </span>
                        <Link
                            href={`/usuario/${state.user.id}`}
                            className="block p-2 rounded hover:bg-gray-100"
                        >
                            <User className="w-6 h-6 text-gray-600 cursor-pointer" />
                        </Link>
                    </>
                )}

                <button onClick={logoutNow}>
                    <LogOut className="w-6 h-6 text-red-500 cursor-pointer" />
                </button>
            </div>
        </header>
    );
}
