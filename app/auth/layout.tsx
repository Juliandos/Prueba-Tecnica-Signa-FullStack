import { AuthProvider } from "@/context/AuthContext"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                {children}
            </div>
            <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        draggable
                    />
        </AuthProvider>
    )
}