import * as React from 'react';
import {Track} from "../model/Track";
import {Box, Typography, useTheme} from "@mui/material";
import {Equalizer} from "./Equalizer";
import {millisToMinutesAndSeconds} from "../utils/TimeUtils";
import {useState} from "react";
import {PauseButton} from "./PauseButton";
import {PlayButton} from "./PlayButton";
import useOnPlay from "../hooks/useOnPlay";
import useOnPause from "../hooks/useOnPause";

type Props = {
    track: Track,
    index: number,
    isActive: boolean,
    isCurrentlyPlaying: boolean
};

export function TrackItem({track, index, isActive, isCurrentlyPlaying}: Props) {
    const theme = useTheme()
    const [showPlayPauseButton, setShowPlayPauseButton] = useState(false)
    const onPlay = useOnPlay(track)
    const onPause = useOnPause()
    console.log(isCurrentlyPlaying)

    return (
        <Box
            onMouseEnter={() => setShowPlayPauseButton(true)}
            onMouseLeave={() => setShowPlayPauseButton(false)}
            sx={{
                display: 'flex',
                position: 'relative',
                transition: 'background-color 0.3s',
                justifyItems: 'center',
                alignItems: 'center',
                padding: theme.spacing(1.5),
                '&:hover': {
                    backgroundColor: 'rgba(206, 206, 206, 0.1)',
                }
            }}>
            <Box sx={{
                position: 'relative',
                height: '30px',
                width: '20px'
            }}>
                {showPlayPauseButton ?
                    isActive ?
                        <PauseButton boxProps={{
                            sx:{
                                backgroundColor: 'transparent'
                            }
                        }}
                            onClick={onPause}/> :

                        <PlayButton boxProps={{
                            sx:{
                                backgroundColor: 'transparent'
                            }
                        }} onClick={onPlay}/> :
                    isActive ?
                        <Equalizer/> :
                        isCurrentlyPlaying ?
                            <Typography variant={"body1"} fontSize={24} color={"green"}> {index} </Typography>
                            :
                            <Typography variant={"body1"} fontSize={24} color={"white"}>
                                {index}
                            </Typography>
                }
            </Box>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                width: '30%',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                <Box sx={{
                    display: 'flex',
                    position: 'relative',
                    aspectRatio: '1',
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: '15px'
                }}>
                    <img src={track.imageUrl}
                         style={{
                             width: '50px',
                             height: '50px',
                             objectFit: 'cover',
                             marginRight: 'auto',
                             display: 'block'
                         }} alt={"track image"}/>
                </Box>

                <Box sx={{
                    position: 'relative',
                    flexDirection: 'column',
                    paddingLeft: '15px'
                }}>
                    <Typography variant={"inherit"} color={isCurrentlyPlaying ? "green" : "white"} noWrap>
                        {track.name}
                    </Typography>
                    <Box sx={{
                        position: 'relative'
                    }}>
                        <Typography
                            variant={"caption"}
                            noWrap
                        >
                            {track.author.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>


            <Box marginLeft={20} sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                <Typography
                    variant={"caption"}
                    noWrap
                >
                    {track.album.name}
                </Typography>
            </Box>

            <Box sx={{
                position: 'relative',
                display: 'flex',
                marginLeft: "auto",
                padding: "15px",
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                <Typography
                    variant={"caption"}
                    noWrap
                >
                    {millisToMinutesAndSeconds(track.durationMs) || 'NaN'}
                </Typography>
            </Box>
        </Box>
    );
};