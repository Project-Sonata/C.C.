// @flow
import * as React from 'react';
import {SonataSlider} from "./SonataSlider";
import {Box} from "@mui/material";
import {useRef, useState} from "react";

interface Props {
    duration: number | null,
    playerControls: Howl,
    onTimeUpdateRequested?: (requestedTimeMs: number) => void
}

export function Timeline({duration, playerControls, onTimeUpdateRequested}: Props) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [progress, setProgress] = useState<number>(0);
    const [trackTime, setTrackTime] = useState(0)

    const startTimer = () => {
        // Clear any timers already running
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        intervalRef.current = setInterval(() => {
            updateTime(playerControls.seek() * 1000)
        }, 1000);
    }

    // Listen to play event, start timeline progress and count already passed time
    playerControls.on('play', () => {
        startTimer()
    })

    function updateTime(timeMs: number) {
        setTrackTime(timeMs)
        // @ts-ignore
        setProgress((timeMs / duration) * 100);
    }

    function handleTrackTimeChange(event: React.SyntheticEvent | Event, value: number | number[]) {
        const percentage = Array.isArray(value) ? value[0] : value;
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        if (duration) {
            const requestProgressMs = (percentage / 100) * duration
            updateTime(requestProgressMs);
        }
    }

    function handleTrackTimeChangeCommitted(event: React.SyntheticEvent | Event, value: number | number[]) {
        const percentage = Array.isArray(value) ? value[0] : value;
        startTimer()
        if (duration) {
            const requestProgressMs = (percentage / 100) * duration
            updateTime(requestProgressMs)
            if (onTimeUpdateRequested) {
                onTimeUpdateRequested(requestProgressMs)
            }
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
        }}>
            {millisToMinutesAndSeconds(trackTime)}

            <SonataSlider onChange={handleTrackTimeChange}
                          onChangeCommitted={handleTrackTimeChangeCommitted}
                          value={progress}/>

            {millisToMinutesAndSeconds(duration)}
        </Box>
    );

    function millisToMinutesAndSeconds(millis?: number | null): string {
        if (millis) {
            const minutes = Math.floor(millis / 60000);
            const seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
        }
        return '0:00'
    }
};