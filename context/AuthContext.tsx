"use client";

import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    password: string;
    created_at: string;
    updated_at: string;
}

interface AuthState {
    token: string | null;
    user: Usuario | null;
}

type AuthAction =
    | { type: "LOGIN"; payload: string }
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
        case "LOGIN": {
            const token = action.payload;
            const decoded = jwtDecode<JwtPayload>(token);
            return { token, user: { id: Number(decoded.sub) } as Usuario };
        }
        case "LOGOUT":
            return { token: null, user: null };
        default:
            return state;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, { token: null, user: null });
    const router = useRouter();

    // ref para guardar el timeout actual
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);

    // 🔹 logout inmediato e independiente
    const logoutNow = () => {
        // limpiar cualquier timer pendiente
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }

        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("correo");

        router.push("/auth/login");
    };

    // 🔹 programar logout automático por expiración
    const programLogout = (ms: number) => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
            logoutNow(); // dispara el mismo logout, pero automático
        }, ms);
    };

    // 🔹 restaurar sesión desde localStorage al cargar la app
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            if (Date.now() < decoded.exp * 1000) {
                dispatch({ type: "LOGIN", payload: token });
                programLogout(decoded.exp * 1000 - Date.now());
            } else {
                localStorage.removeItem("token");
            }
        }
    }, []);

    // 🔹 cada vez que cambia el token, verificamos expiración
    useEffect(() => {
        if (state.token) {
            const decoded = jwtDecode<JwtPayload>(state.token);
            const ms = decoded.exp * 1000 - Date.now();
            if (ms > 0) programLogout(ms);
        }
    }, [state.token]);

    return (
        <AuthContext.Provider value={{ state, dispatch, logoutNow }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
