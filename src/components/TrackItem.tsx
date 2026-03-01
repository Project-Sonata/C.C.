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
    isCurrentlyPlaying: boolean,
    onPlayRequested: (track: Track) => void,
};

export function TrackItem({track, index, isActive, isCurrentlyPlaying, onPlayRequested}: Props) {
    const theme = useTheme()
    const [showPlayPauseButton, setShowPlayPauseButton] = useState(false)
    const onPlay = onPlayRequested
    const onPause = useOnPause()

    const activeColor = "#1DB954" // Spotify-like green or similar brand color

    return (
        <Box
            onMouseEnter={() => setShowPlayPauseButton(true)}
            onMouseLeave={() => setShowPlayPauseButton(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(1, 2),
                borderRadius: 1,
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
            }}
            onClick={() => !isActive && onPlay(track)}
        >
            <Box sx={{
                width: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 2
            }}>
                {showPlayPauseButton ? (
                    isActive ? (
                        <PauseButton 
                            boxProps={{ sx: { backgroundColor: 'transparent', p: 0 } }}
                            onClick={(e) => { e.stopPropagation(); onPause(); }}
                        />
                    ) : (
                        <PlayButton 
                            boxProps={{ sx: { backgroundColor: 'transparent', p: 0 } }}
                            onClick={(e) => { e.stopPropagation(); onPlay(track); }}
                        />
                    )
                ) : (
                    isActive ? (
                        <Equalizer />
                    ) : (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: isCurrentlyPlaying ? activeColor : 'text.secondary',
                                fontWeight: isCurrentlyPlaying ? 600 : 400
                            }}
                        >
                            {index}
                        </Typography>
                    )
                )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flex: 4, minWidth: 0 }}>
                <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 2, 
                    flexShrink: 0,
                    borderRadius: 0.5,
                    overflow: 'hidden'
                }}>
                    <img 
                        src={track.imageUrl} 
                        alt={track.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <Typography 
                        variant="body1" 
                        noWrap 
                        sx={{ 
                            color: isCurrentlyPlaying ? activeColor : 'white',
                            fontWeight: 500
                        }}
                    >
                        {track.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {track.author.name}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ flex: 3, px: 2, display: { xs: 'none', md: 'block' }, minWidth: 0 }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {track.album.name}
                </Typography>
            </Box>

            <Box sx={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body2" color="text.secondary">
                    {millisToMinutesAndSeconds(track.durationMs) || '--:--'}
                </Typography>
            </Box>
        </Box>
    );
};