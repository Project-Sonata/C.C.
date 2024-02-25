// @flow
import Box from '@mui/material/Box';
import * as React from 'react';
import {Menu, MenuItem, MenuProps} from "@mui/material";
import {Track} from "../model/Track";
import useQueue from "../hooks/useQueue";

type Props = {
    menuProps: MenuProps,
    track: Track
    handleClose: () => void;
};
export const TrackMenu = ({track, handleClose, menuProps}: Props) => {
    const queue = useQueue()

    const handleAddToQueue = () => {
        queue.add(track)
        handleClose()
    };

    return (
        <Box>
            <Menu{...menuProps}>
                <MenuItem onClick={handleAddToQueue}>Add to queue</MenuItem>
            </Menu>
        </Box>
    )
};