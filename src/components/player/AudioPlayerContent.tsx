import React, {useEffect, useRef, useState} from 'react';
import usePlayer from "../../hooks/usePlayer";
import useSound from 'use-sound';
import {Box, Grid, IconButton} from "@mui/material";
import {PlayCircle, SkipNext, SkipPrevious, StopCircle} from "@mui/icons-material";
import MediaItem from "../MediaItem";
import {Track} from "../../model/Track";
import {Timeline} from "../Timeline";
import {PlayerOperations} from "../PlayerOperations";
import {AudioControls} from "../AudioControls";

const uris = new Map();

uris.set('123', "./test.mp3",)
uris.set('1234', "./test2.mp3")


type AudioPlayerContentProps = {
    song: Track,
}

function AudioPlayerContent({song}: AudioPlayerContentProps) {
    const player = usePlayer()
    const DEFAULT_VOLUME = 0.2;
    const [isPlaying, setIsPlaying] = useState(false)

    const [play, {pause, sound, duration}] = useSound(
        uris.get(player.activeId),
        {
            volume: DEFAULT_VOLUME,
            onplay: () => {
                console.log("playing")
                setIsPlaying(true);
            },
            onend: () => setIsPlaying(false),
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        play()
        setIsPlaying(true)
        return () => {
            sound?.unload();
            setIsPlaying(false)
        }
    }, [sound]);

    function onPause() {
        setIsPlaying(false)
        pause()
    }

    function onPlay() {
        setIsPlaying(true)
        play()
    }


    if (sound === null || sound === undefined) {
        return (
            <div>
                Failed to load the sound!
            </div>
        )
    }

    function handleTimeUpdateRequested(requestedTimeMs: number) {
        return sound?.seek(requestedTimeMs / 1000);
    }

    function onPlayNext() {

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
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Box sx={{display: 'flex', justifyContent: 'start'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <MediaItem track={song}/*data={song}*/ />
                        {/*<LikeButton songId={song.id} />*/}
                    </Box>
                </Box>
            </Grid>
            {/*Player operations*/}
            <Grid className={"grid"}
                  container
                  justifyContent={"center"}
                  alignContent="center"
                  spacing={0}
                  item xs={12} md={4}>
                <AudioControls isPlaying={isPlaying} onPlay={onPlay} onPause={onPause}/>

                <Grid container>
                    <Timeline duration={duration}
                              playerControls={sound}
                              onTimeUpdateRequested={handleTimeUpdateRequested}/>
                </Grid>
            </Grid>
            {/*Player operations on left side, change active device, volume, fullscreen, etc*/}
            <Grid container xs={12} md={4}>
                <PlayerOperations volume={DEFAULT_VOLUME} playerControls={sound}/>
            </Grid>
        </Grid>
    );
}

export default AudioPlayerContent;