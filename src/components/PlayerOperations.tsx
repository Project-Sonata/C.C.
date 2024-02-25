// @flow
import * as React from 'react';
import {Box, Typography} from "@mui/material";
import {VolumeSlider} from "./VolumeSlider";
import {Devices, Fullscreen, QueueMusic} from "@mui/icons-material";
import Popover from '@mui/material/Popover';
import {useState} from "react";
import {DevicesPopover} from "./DevicesPopover";
import {useNavigate} from "react-router-dom";

type Props = {
    // from 0.1 to 1
    volume: number,
    playerControls: Howl
};

export const PlayerOperations = ({ volume, playerControls }: Props) => {
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State to store the anchor element
    const [isQueueOpen, setIsQueueOpen] = useState(false);

    const handleVolumeChange = (volume: number) => {
        playerControls.volume(volume)
    }

    const navigate = useNavigate()
    const handleDevicesClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // Set the anchor element when the Devices icon is clicked
        setShow(true); // Show the popover
    };

    const handleClosePopover = () => {
        setAnchorEl(null); // Reset the anchor element
        setShow(false); // Hide the popover
    };

    const handleQueueOpenClose = () => {
        if (isQueueOpen) {
            setIsQueueOpen(false)
            navigate(-1)
        } else {
            setIsQueueOpen(true)
            navigate('queue')
        }
    }

    return (
        <Box sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'flex-end',
            paddingRight: 2
        }}>
            <Box onClick={handleQueueOpenClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 50, paddingLeft: '10px'}}>
                <QueueMusic color={isQueueOpen ? "success" : "action"}/>
            </Box>
            <Box onClick={handleDevicesClick} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 50, paddingLeft: '10px' }}>
                <Devices />
            </Box>
            <DevicesPopover show={show} anchorEl={anchorEl} onClose={handleClosePopover}/>
            <VolumeSlider defaultVolume={volume} handleVolumeChange={handleVolumeChange}/>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 50, paddingLeft: '10px' }}>
                <Fullscreen />
            </Box>
        </Box>
    );
};

