// @flow
import * as React from 'react';
import {Device} from "../model/Device";
import {Box, Grid, Stack, Typography, useTheme} from "@mui/material";
import {Computer, Wifi} from "@mui/icons-material";

type Props = {
    device: Device,

};

export function DeviceItem({device}: Props) {
    const theme = useTheme()

    return (
        <Box width={"100%"} padding={'3px'} height={'40px'} sx={{
            transition: 'background-color 0.3s',
            padding: theme.spacing(1.5),
            '&:hover': {
                backgroundColor: 'rgba(206, 206, 206, 0.1)',
            }
        }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <Computer/>
                <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                    <Grid container>
                        <Typography fontSize={15} padding={'0'} color={device.active ? 'green' : 'white'}>{device.name}</Typography>
                    </Grid>
                </Stack>
            </Stack>
        </Box>
    );
};