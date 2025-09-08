// StepProfile.tsx
import React from "react";
import { Grid, TextField } from "@mui/material";
import { RegistrationData } from "./Registration";

type Props = {
    data: RegistrationData;
    onChange: (values: Partial<RegistrationData>) => void;
};

export const StepProfile: React.FC<Props> = ({ data, onChange }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Username"
                    value={data.username}
                    onChange={(e) => onChange({ username: e.target.value })}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    type="date"
                    label="Birthdate"
                    value={data.birthdate}
                    onChange={(e) => onChange({ birthdate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    select
                    label="Gender"
                    value={data.gender}
                    onChange={(e) => onChange({ gender: e.target.value })}
                    SelectProps={{ native: true }}
                >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </TextField>
            </Grid>
        </Grid>
    );
};
