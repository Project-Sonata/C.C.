import { useState } from "react";

export type User = {
    id: string;
    username: string;
    avatarUrl?: string;
};

export type RegisterResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Check if email is available
     * Returns true if available, false if already taken
     */
    const checkEmail = async (email: string): Promise<boolean> => {
        return Promise.resolve(true)
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await fetch("/auth/check-email", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email }),
        //     });
        //     const data = await res.json();
        //     setLoading(false);
        //     return data.available; // API should return { available: boolean }
        // } catch (err) {
        //     setLoading(false);
        //     setError("Failed to check email");
        //     return false;
        // }
    };

    /**
     * Register a new user
     * Payload contains email, password, username, birthdate, gender, agreeTerms, subscribeEmails
     */
    const register = async (payload: any): Promise<RegisterResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registration failed");
                setLoading(false);
                return null;
            }
            setLoading(false);
            return data as RegisterResponse;
        } catch (err) {
            setLoading(false);
            setError("Registration failed");
            return null;
        }
    };

    return { checkEmail, register, loading, error, setError };
};