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
import useQueue from "../../hooks/useQueue";
import useOnPlay from "../../hooks/useOnPlay";

const uris = new Map();

uris.set('123', "/test.mp3",)
uris.set('1234', "/test2.mp3")
uris.set('1235', "/test3.mp3")
uris.set('04nJixim5a0MAz3PGiVID1', "/test4.mp3")
uris.set('1237', "/test5.mp3")
uris.set('1238', "/test6.mp3")
uris.set('1239', "/test7.mp3")
uris.set('miku123', "/test8.mp3")


type AudioPlayerContentProps = {
    song: Track,
    isActive: boolean
}

function AudioPlayerContent({song, isActive}: AudioPlayerContentProps) {
    const player = usePlayer()
    const queue = useQueue()

    const [isPlaying, setIsPlaying] = useState(isActive)
    const [volume, setVolume] = useState(0.5)

    const [play, {pause, sound, duration}] = useSound(
        uris.get(player.activeId),
        {
            onend: () => onPlayNext(),
            format: ['mp3']
        }
    );

    useEffect(() => {
        player.setIsActive(isPlaying)
    }, [isPlaying]);

    useEffect(() => {
        setVolume(player.volume)
        sound?.volume(player.volume)
    }, [player.volume])

    useEffect(() => {
        if (isActive) {
            if (!sound?.playing()) {
                onPlay()
            }
        } else {
            onPause()
        }
    }, [isActive])

    useEffect(() => {
        onPlay()
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
        const nextTrack = queue.next()
        if (!nextTrack) {
            setIsPlaying(false)
            player.setContext(undefined)
            return;
        }
        player.setId(nextTrack.id)
        player.setCurrentTrack(nextTrack)
        player.setIsActive(true)
    }

    function onPlayPrevious() {
        const previous = queue.previous()

        if (!previous) {
            setIsPlaying(false)
            return;
        }
        player.setId(previous.id)
        player.setCurrentTrack(previous)
        player.setIsActive(true)

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
                <AudioControls onNext={onPlayNext} onPrev={onPlayPrevious} isPlaying={isPlaying} onPlay={onPlay} onPause={onPause}/>

                <Grid container>
                    <Timeline duration={duration}
                              playerControls={sound}
                              onTimeUpdateRequested={handleTimeUpdateRequested}/>
                </Grid>
            </Grid>
            {/*Player operations on left side, change active device, volume, fullscreen, etc*/}
            <Grid container xs={12} md={4}>
                <PlayerOperations volume={volume} playerControls={sound}/>
            </Grid>
        </Grid>
    );
}

export default AudioPlayerContent;