"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    password: string; // 👈 en frontend normalmente no se expone, solo se envía en registro/login
    created_at: string;  // formato ISO (ej: "2025-08-22T12:34:56Z")
    updated_at: string;
}

interface AuthState {
    token: string | null;
    user: Usuario | null;
}

type AuthAction =
    | { type: "LOGIN"; payload: string } // payload = token
    | { type: "LOGOUT" };

interface JwtPayload {
    exp: number;
    sub: string;
}

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}>({
    state: { token: null, user: null },
    dispatch: () => { },
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

    // Restaurar sesión desde localStorage
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

    const programLogout = (ms: number) => {
        setTimeout(() => {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
            router.push("/auth/login");
        }, ms);
    };

    // Programar logout cuando hay un token
    useEffect(() => {
        if (state.token) {
            const decoded = jwtDecode<JwtPayload>(state.token);
            const ms = decoded.exp * 1000 - Date.now();
            if (ms > 0) programLogout(ms);
        }
    }, [state.token]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
