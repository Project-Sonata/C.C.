import { useState } from "react";
import {RegistrationData} from "../components/registration/Registration";

export type User = {
    id: string;
    email: string;
    avatar_url?: string;
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
    const register = async (payload: RegistrationData): Promise<RegisterResponse | null> => {
        setLoading(true);
        setError(null);

        const registrationPayload = {
            email: payload.email,
            password: payload.password,
            birthdate: payload.birthdate,
            gender: payload.gender,
            enable_notification: payload.receiveEmails
        };

        try {
            // const res = await fetch(`http://localhost:8080/v1/signup/email`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(registrationPayload),
            // });
            // const data = await res.json();
            // if (!res.ok) {
            //     setError(data.message || "Registration failed");
            //     setLoading(false);
            //     return null;
            // }
            // setLoading(false);
            // return data as RegisterResponse;

            return {
                accessToken: "token1_2",
                refreshToken: "absent",
                user: {
                    email: "odeyalo@gmail.com",
                    id: "1",
                    avatar_url: "https://i.pinimg.com/736x/16/76/32/167632879f6b035992e0a0fad48df605.jpg"
                }
            }
        } catch (err) {
            setLoading(false);
            setError("Registration failed");
            return null;
        }
    };

    return { checkEmail, register, loading, error, setError };
};