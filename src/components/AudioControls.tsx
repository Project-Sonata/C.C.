// @flow
import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import {PlayCircle, SkipNext, SkipPrevious, StopCircle} from "@mui/icons-material";

type Props = {
    onPlay: () => void;
    onPause: () => void;
    isPlaying: boolean,
    onNext: () => void
};
export const AudioControls = ({onPause, onPlay, isPlaying, onNext}: Props) => {

    function onPlayNext() {
        onNext()
    }

    function onPlayPrevious() {

    }

    function handlePlay() {
        if (isPlaying) {
            onPause()
        } else {
            onPlay()
        }
    }

    return (
        <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            <SkipPrevious
                onClick={onPlayPrevious}
                style={{color: '#A0AEC0', cursor: 'pointer', transition: 'color 0.3s'}}
                fontSize="large"
            />

            <Box style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <IconButton onClick={handlePlay} style={{width: '40px', height: '40px'}}>
                    {isPlaying ? <StopCircle fontSize="large"/> : <PlayCircle fontSize="large"/>}
                </IconButton>
            </Box>

            <SkipNext
                onClick={onPlayNext}
                style={{color: '#A0AEC0', cursor: 'pointer', transition: 'color 0.3s'}}
                fontSize="large"
            />
        </Box>
    );
};