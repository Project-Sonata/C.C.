import { useState } from "react";
import { loginRequest } from "../actions/authService";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(email: string, password: string, remember: boolean) {
        setLoading(true);
        setError(null);

        try {
            const result = await loginRequest(email, password);

            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            localStorage.setItem("user", JSON.stringify(result.user));

            if (remember) {
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("rememberMe");
            }

            return result.user;
        } catch (err: any) {
            setError(err.message || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error };
}
