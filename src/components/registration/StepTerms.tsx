import React from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { RegistrationData } from "./Registration";

type Props = {
    data: RegistrationData;
    onChange: (values: Partial<RegistrationData>) => void;
};

export const StepTerms: React.FC<Props> = ({ data, onChange }) => {
    return (
        <Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.receiveEmails}
                        onChange={(e) => onChange({ receiveEmails: e.target.checked })}
                    />
                }
                label="I want to receive emails with updates and promotions"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.termsAccepted}
                        onChange={(e) => onChange({ termsAccepted: e.target.checked })}
                    />
                }
                label="I agree to the Terms & Conditions"
            />
        </Box>
    );
};
