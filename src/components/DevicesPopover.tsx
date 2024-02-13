import * as React from 'react';
import Popover from "@mui/material/Popover";
import {Box, Stack, Typography} from "@mui/material";
import {Equalizer} from "@mui/icons-material";

type Props = {
    show: boolean,
    anchorEl: HTMLElement | null,
    onClose: () => void,
};

export const DevicesPopover = ({anchorEl, onClose, show}: Props) => {
    return (
        <Popover sx={{}}
                 open={show}
                 anchorEl={anchorEl}
                 onClose={onClose}
                 anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                 }}
                 transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                 }}
                 slotProps={{
                     paper: {
                         style: {
                             position: 'absolute',
                             width: '20%',
                         }
                     },
                 }}
        >
            <Box sx={{p: 2}}>
                <Box>
                    <Stack direction="row" alignItems="center" gap={1} whiteSpace={"pre-wrap"}>
                        <Equalizer/>
                        <Typography>Current Device</Typography>
                        <Typography>This Device</Typography>
                    </Stack>
                </Box>
            </Box>
        </Popover>
    );
};
