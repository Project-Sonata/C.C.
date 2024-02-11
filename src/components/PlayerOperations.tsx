// @flow
import * as React from 'react';
import {Box} from "@mui/material";
import {VolumeSlider} from "./VolumeSlider";
import {Fullscreen} from "@mui/icons-material";

type Props = {
    // from 0.1 to 1
    volume: number,
    playerControls: Howl
};

export const PlayerOperations = ({volume, playerControls}: Props) => {

    const handleVolumeChange = (volume: number) => {
        playerControls.volume(volume)
    }

    return (
        <Box sx={{
            display: {xs: 'none', md: 'flex'},
            width: '100%',
            justifyContent: 'flex-end',
            paddingRight: 2
        }}>
            <VolumeSlider defaultVolume={volume} handleVolumeChange={handleVolumeChange}></VolumeSlider>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: 50, paddingLeft: '10px'}}>
                <Fullscreen/>
            </Box>
        </Box>
    );
};