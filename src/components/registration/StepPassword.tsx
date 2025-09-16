import React, { useState } from "react";
import {
    TextField,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { RegistrationData } from "./Registration";

type Props = {
    data: RegistrationData;
    onChange: (values: Partial<RegistrationData>) => void;
};

export const StepPassword: React.FC<Props> = ({ data, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Password"
                    placeholder="At least 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                    helperText="At least 8 characters and 1 number"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                    onClick={() => setShowPassword((s) => !s)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
};