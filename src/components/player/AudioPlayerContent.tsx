import React, { useEffect, useState } from 'react';
import usePlayer from "../../hooks/usePlayer";
import useQueue from "../../hooks/useQueue";
import useSound from 'use-sound';
import { Box, Grid } from "@mui/material";
import MediaItem from "../MediaItem";
import { Track } from "../../model/Track";
import { Timeline } from "../Timeline";
import { AudioControls } from "../AudioControls";
import { PlayerOperations } from "../PlayerOperations";

const uris = new Map();
uris.set('123', "/test.mp3");
uris.set('1234', "/test2.mp3");
uris.set('1235', "/test3.mp3");
uris.set('04nJixim5a0MAz3PGiVID1', "/test4.mp3");
uris.set('1237', "/test5.mp3");
uris.set('1238', "/test6.mp3");
uris.set('1239', "/test7.mp3");
uris.set('miku123', "/test8.mp3");

type AudioPlayerContentProps = {
    song: Track;
    isActive: boolean;
};

function AudioPlayerContent({ song, isActive }: AudioPlayerContentProps) {
    const player = usePlayer();
    const queue = useQueue();

    const onPause = () => { player.setIsActive(false); pause(); };
    const onPlay = () => { player.setIsActive(true); play(); };

    const [play, { pause, sound, duration }] = useSound(
        uris.get(song.id),
        { onend: onPlayNext, format: ['mp3'] }
    );

    useEffect(() => {
        if (!sound) return;
        sound?.volume(player.volume);
    }, [player.volume, sound]);

    useEffect(() => {
        if (isActive) !sound?.playing() && onPlay();
        else onPause();
    }, [isActive]);

    useEffect(() => {
        onPlay();
        return () => { sound?.unload(); player.setIsActive(false); };
    }, [sound]);

    if (!sound) return <div>Failed to load the sound!</div>;

    const handleTimeUpdateRequested = (requestedTimeMs: number) => sound?.seek(requestedTimeMs / 1000);

    function onPlayNext() {
        const nextTrack = queue.next();
        if (!nextTrack) {
            player.setIsActive(false);
            return;
        }
        player.setId(nextTrack.id);
        player.setCurrentTrack(nextTrack);
        player.setIsActive(true);
    }

    const onPlayPrevious = () => {
        const prevTrack = queue.previous();
        if (!prevTrack) {
            player.setIsActive(false);
            return;
        }
        player.setId(prevTrack.id);
        player.setCurrentTrack(prevTrack);
        player.setIsActive(true);
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MediaItem track={song} />
                </Box>
            </Grid>

            <Grid item xs={12} md={4} container direction="column" alignItems="center" spacing={0}>
                <AudioControls
                    onNext={onPlayNext}
                    onPrev={onPlayPrevious}
                    isPlaying={player.isActive}
                    onPlay={onPlay}
                    onPause={onPause}
                />
                <Box sx={{ mt: 1, width: '100%' }}>
                    <Timeline
                        duration={duration}
                        playerControls={sound}
                        onTimeUpdateRequested={handleTimeUpdateRequested}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={4}>
                <PlayerOperations volume={player.volume} playerControls={sound} />
            </Grid>
        </Grid>
    );
}


export default AudioPlayerContent;