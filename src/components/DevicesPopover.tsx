import * as React from 'react';
import Popover from "@mui/material/Popover";
import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import {Equalizer} from './Equalizer';
import {Devices, RestartAlt, Wifi} from "@mui/icons-material";
import {DeviceItem} from "./DeviceItem";
import useDevices from "../hooks/useDevices";

type Props = {
    show: boolean,
    anchorEl: HTMLElement | null,
    onClose: () => void,
};

export const DevicesPopover = ({anchorEl, onClose, show}: Props) => {
    const devices = useDevices()

    return (
        <Popover
            open={show}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            slotProps={{
                paper: {
                    style: {
                        position: 'absolute',
                        height: 'auto',
                        width: '25%',
                    }
                }
            }}
        >
            {
                devices.inactiveDevices.length === 0 ?
                    <SonataConnectInfo/>
                    :
                    <Box>
                        <Stack direction="row" padding={"12px"} gap={1}>
                            <Equalizer height={'40px'} width={'30px'} barWidth={'4px'}/>
                            <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                                <Grid container>
                                    <Typography fontSize={15} padding={'0'}>Current Device</Typography>
                                </Grid>
                                <Grid container>
                                    <Typography fontSize={14} paddingTop={'0'}
                                                color={"green"}>{devices.activeDevice?.name}</Typography>
                                </Grid>
                            </Stack>
                        </Stack>

                        {devices.inactiveDevices.map(device =>
                            <Grid container>
                                <DeviceItem device={device}/>
                            </Grid>)}
                    </Box>
            }
        </Popover>
    );
}
const SonataConnectInfo = () => {
    return (
        <Box sx={{
            padding: 2,
            display: 'flex',
            position: 'relative',
        }}>
            <Box>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Equalizer height={'40px'} width={'30px'} barWidth={'4px'}/>
                    <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                        <Grid container>
                            <Typography fontSize={15} padding={'0'}>Current Device</Typography>
                        </Grid>
                        <Grid container>
                            <Typography fontSize={14} paddingTop={'0'} color={"green"}>This Device</Typography>
                        </Grid>
                    </Stack>
                </Stack>

                <Divider variant={"fullWidth"}/>
                <Typography>No other device found</Typography>

                <Stack direction="row" alignItems="center" gap={1}>
                    <Wifi/>
                    <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                        <Grid container>
                            <Typography fontSize={15} padding={'0'} color={'white'}>Check your WIFI</Typography>
                        </Grid>
                        <Grid container>
                            <Typography fontSize={12} padding={'0'} color={'gray'}>Connect the devices you are using
                                to the same WIFI network</Typography>
                        </Grid>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                    <Devices/>
                    <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                        <Grid container>
                            <Typography fontSize={15} padding={'0'} color={'white'}>Play from other
                                device</Typography>
                        </Grid>
                        <Grid container>
                            <Typography fontSize={12} padding={'0'} color={'gray'}>It will automatically appear
                                here</Typography>
                        </Grid>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <RestartAlt/>
                    <Stack direction="column" alignItems="flex-start" spacing={'1px'}>
                        <Grid container>
                            <Typography fontSize={15} padding={'0'} color={'white'}>Restart your
                                speaker</Typography>
                        </Grid>
                        <Grid container>
                            <Typography fontSize={12} padding={'0'} color={'gray'}>Restart a device or speaker and
                                try again</Typography>
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}