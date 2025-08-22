'use client';
import toast from "react-hot-toast";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroForm() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:8081/usuarios/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ nombre, correo, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Registro fallido');
            }
            toast.success("¡Usuario registrado con éxito! 🎉");
            router.push('/auth/login');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Error en registro');
            setError(err instanceof Error ? err.message : 'Registro fallido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold">Registro</h2>

            {error && <div className="text-red-500">{error}</div>}

            <div>
                <label htmlFor="nombre" className="block mb-1">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="correo" className="block mb-1">Correo</label>
                <input
                    id="correo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-green-300"
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            {/* Botón para regresar a login */}
            <button
                type="button"
                onClick={() => router.push('/login')}
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
                Volver a Login
            </button>
        </form>
    );
}
