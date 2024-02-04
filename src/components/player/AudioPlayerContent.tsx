import React, {useEffect, useMemo, useState} from 'react';
import usePlayer from "../../hooks/usePlayer";
import useSound from 'use-sound';
import {Grid, Icon, IconButton, Slider, Typography} from "@mui/material";
import {PlayCircle, SkipNext, SkipPrevious, StopCircle, VolumeUp} from "@mui/icons-material";
import MediaItem from "../MediaItem";
import "../MediaItem.css"
import {styled} from "@mui/material/styles";

type AudioPlayerContentProps = {
    song: object,
    songUrl: string
}


function AudioPlayerContent({song, songUrl}: AudioPlayerContentProps) {
    const player = usePlayer()
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [trackTime, setTrackTime] = useState(0)
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        sound?.seek(trackTime / 1000)
    }, [trackTime]);

    const [play, {pause, sound, duration}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => {
                setIsPlaying(true);
            },
            onend: () => setIsPlaying(false),
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    function onPlayNext() {

    }

    function onPlayPrevious() {

    }

    function handlePlay() {
        if (isPlaying) {
            pause()
        } else {
            play()
            if (sound?.seek() && duration) {
                updateTime(sound?.seek() * 1000)
            }
        }
    }

    function toggleMute() {

    }

    const handleVolumeChange = (e: Event, value: number | number[]) => {
        const volume = Array.isArray(value) ? value[0] : value;
        setVolume(volume / 100);
    }

    function updateTime(timeMs: number) {
        setTrackTime(timeMs);
        // @ts-ignore
        setProgress((timeMs / duration) * 100);
    }

    const handleTrackTimeChange = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        const percentage = Array.isArray(value) ? value[0] : value;
        if (duration) {
            const requestProgressMs = (percentage / 100) * duration
            updateTime(requestProgressMs);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <div style={{display: 'flex', justifyContent: 'start'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <MediaItem /*data={song}*/ />
                        {/*<LikeButton songId={song.id} />*/}
                    </div>
                </div>
            </Grid>

            <Grid className={"grid"}
                  container
                  justifyContent={"center"}
                  alignContent="center"
                  spacing={0}

                  item xs={12} md={4}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                    <SkipPrevious
                        onClick={onPlayPrevious}
                        style={{color: '#A0AEC0', cursor: 'pointer', transition: 'color 0.3s'}}
                        fontSize="large"
                    />

                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <IconButton onClick={handlePlay} style={{width: '40px', height: '40px'}}>
                            {isPlaying ? <StopCircle fontSize="large"/> : <PlayCircle fontSize="large"/>}
                        </IconButton>
                    </div>

                    <SkipNext
                        onClick={onPlayNext}
                        style={{color: '#A0AEC0', cursor: 'pointer', transition: 'color 0.3s'}}
                        fontSize="large"
                    />
                </div>

                <Grid container>
                    <div style={{
                        display: 'flex',
                        width: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        {millisToMinutesAndSeconds(trackTime)}
                        <Slider min={0} max={100} className={"timeSlider"} onChangeCommitted={handleTrackTimeChange}
                                value={progress}></Slider>
                        {millisToMinutesAndSeconds(duration)}
                    </div>
                </Grid>

            </Grid>

            <Grid item xs={12} md={4}>
                <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '2rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem', width: '120px'}}>
                        <VolumeUp onClick={toggleMute} style={{cursor: 'pointer'}} fontSize="small"/>
                        <Slider className="volume-mixer" value={volume * 100}
                                onChange={(e, value) => handleVolumeChange(e, value)}/>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

function millisToMinutesAndSeconds(millis?: number | null): string {
    if (millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
    }
    return '0:00'
}

export default AudioPlayerContent;