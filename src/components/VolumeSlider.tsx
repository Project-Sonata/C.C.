// @flow
import * as React from 'react';
import {useState} from 'react';
import {VolumeOff, VolumeUp} from "@mui/icons-material";
import {SonataSlider} from "./SonataSlider";
import {Box} from "@mui/material";

type Props = {
    defaultVolume: number,
    handleVolumeChange: (volume: number) => void;
};

const MUTE_SOUND_VOLUME = 0;

export const VolumeSlider = ({defaultVolume, handleVolumeChange}: Props) => {
    const [volume, setVolume] = useState(defaultVolume)
    const [cachedVolume, setCachedVolume] = useState(volume)
    const [isMuted, setIsMuted] = useState(volume === 0)

    const onVolumeChange = (e: Event, value: number | number[]) => {
        const volumeValue = (Array.isArray(value) ? value[0] : value) / 100;

        if (isMuted) {
            setIsMuted(false)
        }
        if (volumeValue === 0) {
            setIsMuted(true)
        }

        setVolume(volumeValue);
        handleVolumeChange(volumeValue)
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: 100}}>
            {isMuted ?
                <VolumeOff onClick={toggleMute} style={{cursor: 'pointer'}} fontSize="small"/> :
                <VolumeUp onClick={toggleMute} style={{cursor: 'pointer'}} fontSize="small"/>
            }
            <SonataSlider value={volume * 100} onChange={onVolumeChange}/>
        </Box>
    );

    function toggleMute() {
        isMuted ? unmute() : mute();
    }

    function unmute() {
        setIsMuted(false)
        setVolume(cachedVolume)
        handleVolumeChange(cachedVolume)
    }

    function mute() {
        setIsMuted(true)
        setCachedVolume(volume)
        setVolume(MUTE_SOUND_VOLUME)
        handleVolumeChange(MUTE_SOUND_VOLUME)
    }
};