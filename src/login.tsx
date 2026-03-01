import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function Login() {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = String(data.get("email"));
        const password = String(data.get("password"));

        try {
            await login(email, password, checked);
            navigate("/");
        } catch {
            // error is already handled in hook
        }
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h4">Log in to Sonata</Typography>

            <Box component="form" onSubmit={handleSubmit} className="login-form">
                <Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        color="success"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="success"
                    />
                </Grid>
                <FormControlLabel
                    control={<Checkbox onChange={handleChange} color="success" />}
                    label="Remember me"
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}

                <Box textAlign="center" sx={{ paddingTop: "10px" }}>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        sx={{
                            borderRadius: 20,
                            textTransform: "none",
                            width: "80%",
                        }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </Box>

                {/* Sign up link */}
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/sign-up")}
                        sx={{
                            color: "success.main",
                            textDecoration: "none",
                            fontWeight: "bold",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Don’t have an account? Sign up
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
