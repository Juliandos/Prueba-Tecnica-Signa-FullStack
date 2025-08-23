"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
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
    logoutNow: () => void;   // 👈 añadimos función manual
}>({
    state: { token: null, user: null },
    dispatch: () => { },
    logoutNow: () => { },
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
            logoutNow();
        }, ms);
    };

    // 👇 función manual para logout inmediato
    const logoutNow = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("correo");
        router.push("/auth/login");
    };

    // Programar logout por expiración
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
