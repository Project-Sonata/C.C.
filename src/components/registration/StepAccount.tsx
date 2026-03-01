import React from "react";
import { TextField, Grid } from "@mui/material";
import { RegistrationData } from "./Registration";

type Props = {
    data: RegistrationData;
    onChange: (values: Partial<RegistrationData>) => void;
};

export const StepAccount: React.FC<Props> = ({ data, onChange }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Email"
                    value={data.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                    helperText="At least 8 characters and 1 number"
                />
            </Grid>
        </Grid>
    );
};
