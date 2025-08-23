"use client";

import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
}

interface AuthState {
    token: string | null;
    user: Usuario | null;
}

type AuthAction =
    | { type: "LOGIN"; payload: { token: string; user: Usuario } }
    | { type: "LOGOUT" };

interface JwtPayload {
    exp: number;
    sub: string;
}

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    logoutNow: () => void;
}>( {
    state: { token: null, user: null },
    dispatch: () => {},
    logoutNow: () => {},
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return { token: action.payload.token, user: action.payload.user };
        case "LOGOUT":
            return { token: null, user: null };
        default:
            return state;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, { token: null, user: null });
    const router = useRouter();
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);

    const logoutNow = () => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);

        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("correo");
        router.push("/auth/login");
    };

    const programLogout = (ms: number) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => logoutNow(), ms);
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            const correo = localStorage.getItem("correo");

            if (!token || !correo) return;

            const decoded = jwtDecode<JwtPayload>(token);
            if (Date.now() >= decoded.exp * 1000) {
                logoutNow();
                return;
            }

            try {
                const res = await fetch(`${API_URL}/usuarios`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Error obteniendo usuarios");

                const usuarios: Usuario[] = await res.json();
                const user = usuarios.find((u) => u.correo === correo);

                if (user) {
                    dispatch({ type: "LOGIN", payload: { token, user } });
                    programLogout(decoded.exp * 1000 - Date.now());
                } else {
                    logoutNow();
                }
            } catch (error) {
                console.error(error);
                logoutNow();
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch, logoutNow }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
