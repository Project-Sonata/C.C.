import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";

function Login() {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // TODO: Implement real login
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            remember: checked
        });
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4">
                Log in to Sonata
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                className="login-form"
            >
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
                    control={<Checkbox onChange={handleChange} value="remember" color="success"/>}
                    label="Remember me"
                />

                <Box textAlign='center' sx={{
                    paddingTop: '10px',
                }}>
                    <Button type="submit" color="success" variant="contained" sx={{
                        borderRadius: 20,
                        textTransform: 'none',
                        width: '80%'
                    }}>Log In</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;
