import React, {useState} from "react";
import {
    Box,
    Button,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useRegister} from "../../hooks/useRegister";
import {StepTerms} from "./StepTerms";
import {StepPassword} from "./StepPassword";
import {StepProfile} from "./StepProfile";

export type RegistrationData = {
    email: string;
    password: string;
    username: string;
    birthdate: string;
    gender: string;
    termsAccepted: boolean;
    receiveEmails: boolean;
};

const steps = ["Email", "Password", "Profile", "Terms"];

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
    const {checkEmail, register} = useRegister();

    const handleNext = async () => {
        if (activeStep === 0) {
            const available = await checkEmail(formData.email);
            if (!available) {
                alert("Email is already taken");
                return;
            }
        }

        if (activeStep === steps.length - 1) {
            console.log(formData)
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

    const handleChange = (values: Partial<RegistrationData>) => {
        setFormData((prev) => ({...prev, ...values}));
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#121212",
            }}
        >
            <Box
                sx={{
                    maxWidth: 350,
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    px: 3,
                    py: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >


                {activeStep === 0 && (
                    <>
                        {/* Title */}
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{fontWeight: 700, color: "white"}}
                        >
                            Sign up to start listening
                        </Typography>
                        {/* Email label */}
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 0.5, // smaller margin below the label
                                textAlign: "left",
                                color: "rgba(255,255,255,0.8)",
                                fontWeight: 500,
                            }}
                        >
                            Email address
                        </Typography>

                        {/* Email input */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange({email: e.target.value})
                            }
                            sx={{
                                mb: 2, // spacing after input
                                borderRadius: 1,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1,
                                    backgroundColor: "white",
                                    "&.Mui-focused": {
                                        backgroundColor: "inherit", // remove white when focused
                                    },
                                },
                            }}
                        />

                        {/* Next button */}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleNext}
                            sx={{
                                mt: 2,
                                borderRadius: "30px",
                                backgroundColor: "#1DB954",
                                fontWeight: 600,
                                textTransform: "none",
                                py: 1.2,
                                "&:hover": {backgroundColor: "#1ed760"},
                            }}
                        >
                            Next
                        </Button>

                        {/* Divider */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                my: 3,
                            }}
                        >
                            <Divider
                                sx={{
                                    flex: 1,
                                    borderColor: "rgba(255,255,255,0.3)",
                                }}
                            />
                            <Typography
                                sx={{
                                    px: 2,
                                    color: "rgba(255,255,255,0.7)",
                                    fontWeight: 500,
                                }}
                            >
                                or
                            </Typography>
                            <Divider
                                sx={{
                                    flex: 1,
                                    borderColor: "rgba(255,255,255,0.3)",
                                }}
                            />
                        </Box>

                        {/* Google OAuth2 button */}
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={
                                <img
                                    src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
                                    alt="Google logo"
                                    style={{width: 20, height: 20}}
                                />
                            }
                            sx={{
                                borderRadius: "30px",
                                textTransform: "none",
                                fontWeight: 600,
                                py: 1.2,
                                color: "white",
                                borderColor: "rgba(255,255,255,0.6)",
                                "&:hover": {
                                    borderColor: "white",
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                },
                            }}
                            onClick={() => {
                                window.location.href = "/oauth2/google";
                            }}
                        >
                            Sign up with Google
                        </Button>

                        {/* Bottom "Already have account" text + Login text */}
                        <Box
                            sx={{
                                mt: 5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{color: "rgba(255,255,255,0.7)"}}
                            >
                                Already have an account?
                            </Typography>

                            <Typography
                                onClick={() => navigate("/login")}
                                sx={{
                                    color: "white",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                        color: "#1DB954",
                                    },
                                }}
                            >
                                Login
                            </Typography>
                        </Box>
                    </>
                )}

                {/* Later steps */}
                {activeStep === 1 && (
                    <>
                        <StepPassword data={formData} onChange={(e) => {
                            handleChange({password: e.password})
                        }}/><Button
                        variant="contained"
                        fullWidth
                        onClick={handleNext}
                        sx={{
                            mt: 2,
                            borderRadius: "30px",
                            backgroundColor: "#1DB954",
                            fontWeight: 600,
                            textTransform: "none",
                            py: 1.2,
                            "&:hover": {backgroundColor: "#1ed760"},
                        }}
                    >
                        Next
                    </Button></>
                )}
                {activeStep === 2 && (
                    <>
                        <StepProfile data={formData} onChange={(values) => {
                            handleChange(values)
                        }}/>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleNext}
                            sx={{
                                mt: 2,
                                borderRadius: "30px",
                                backgroundColor: "#1DB954",
                                fontWeight: 600,
                                textTransform: "none",
                                py: 1.2,
                                "&:hover": {backgroundColor: "#1ed760"},
                            }}
                        >
                            Next
                        </Button>
                    </>
                )}
                {activeStep === 3 && (
                    <>
                        <StepTerms data={formData} onChange={(values) => {
                            handleChange(values)
                        }}/>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleNext}
                            sx={{
                                mt: 2,
                                borderRadius: "30px",
                                backgroundColor: "#1DB954",
                                fontWeight: 600,
                                textTransform: "none",
                                py: 1.2,
                                "&:hover": {backgroundColor: "#1ed760"},
                            }}
                        >
                            Next
                        </Button></>
                )}
            </Box>
        </Box>
    );
};

export default Registration;
