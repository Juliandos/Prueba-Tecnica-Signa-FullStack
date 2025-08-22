'use client';
import toast from "react-hot-toast";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { dispatch } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:8081/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Login fallido ❌");
            }

            // Guardar token en localStorage
            localStorage.setItem("token", data.access_token);

            // Guardar correo en localStorage
            localStorage.setItem("correo", data.correo);

            // Dispatch al contexto
            dispatch({ type: "LOGIN", payload: data.access_token });
            toast.success("¡Bienvenido! 🎉");
            // Redirigir
            router.push("/marcas");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error en login');
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Botón para ir a registro */}
            <button
                type="button"
                onClick={() => router.push('/auth/registro')}
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
                Ir a Registro
            </button>
        </form>
    );
}
