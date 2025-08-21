import { Menu, LogOut, User } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
            <button className="md:hidden p-2">
                <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-gray-600 cursor-pointer" />
                <LogOut className="w-6 h-6 text-red-500 cursor-pointer" />
            </div>
        </header>
    )
}
