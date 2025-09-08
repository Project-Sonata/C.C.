import React, { useState } from "react";
import { Box, Button, LinearProgress, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StepAccount } from "./StepAccount";
import { StepProfile } from "./StepProfile";
import { StepTerms } from "./StepTerms";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export type RegistrationData = {
    email: string;
    password: string;
    username: string;
    birthdate: string;
    gender: string;
    termsAccepted: boolean;
    receiveEmails: boolean;
};

const steps = ["Account", "Profile", "Terms"];

const Registration = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<RegistrationData>({
        email: "",
        password: "",
        username: "",
        birthdate: "",
        gender: "",
        termsAccepted: false,
        receiveEmails: false,
    });

    const navigate = useNavigate();
    const { checkEmail, register } = useRegister();

    const handleNext = async () => {
        if (activeStep === 0) {
            const available = await checkEmail(formData.email);
            if (!available) {
                alert("Email is already taken");
                return;
            }
        }

        if (activeStep === steps.length - 1) {
            const resp = await register(formData);
            if (!resp) return;

            localStorage.setItem("accessToken", resp.accessToken);
            localStorage.setItem("refreshToken", resp.refreshToken);
            localStorage.setItem("user", JSON.stringify(resp.user));
            navigate("/");
            return;
        }

        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (values: Partial<RegistrationData>) => {
        setFormData((prev) => ({ ...prev, ...values }));
    };

    const progress = ((activeStep + 1) / steps.length) * 100;

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 6, color: "white" }}>
            {/* Top bar with back arrow */}
            {activeStep > 0 && (
                <IconButton onClick={handleBack} sx={{ mb: 2, color: "green" }}>
                    <ArrowBackIcon />
                </IconButton>
            )}

            <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: "green" }}>
                Sign up for Sonata
            </Typography>

            <Typography textAlign="center" sx={{ mb: 2 }}>
                Step {activeStep + 1} / {steps.length}
            </Typography>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mb: 3, height: 10, borderRadius: 5, backgroundColor: "#2e7d32", '& .MuiLinearProgress-bar': { backgroundColor: "#66bb6a" } }}
            />

            {/* Step content */}
            {activeStep === 0 && <StepAccount data={formData} onChange={handleChange} />}
            {activeStep === 1 && <StepProfile data={formData} onChange={handleChange} />}
            {activeStep === 2 && <StepTerms data={formData} onChange={handleChange} />}

            {/* Next / Register button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        px: 6,
                        py: 1.5,
                        textTransform: "none",
                        '&:hover': {
                            backgroundColor: "#66bb6a",
                        },
                    }}
                >
                    {activeStep === steps.length - 1 ? "Register" : "Next"}
                </Button>
            </Box>
        </Box>
    );
};

export default Registration;