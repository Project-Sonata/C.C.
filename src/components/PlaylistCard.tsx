import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";
import { PlaylistMenu } from "./PlaylistMenu";
import { Playlist } from "../model/Playlist";
import { useNavigate } from "react-router-dom";
import useOnPlay from "../hooks/useOnPlay";
import useOnPause from "../hooks/useOnPause";

type Props = {
    playlist: Playlist,
    isPlaying: boolean
};

export function PlaylistCard({ playlist, isPlaying }: Props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const onPlay = useOnPlay(playlist.tracks, playlist.context);
    const onPause = useOnPause();

    const [showPlayButton, setShowPlayButton] = useState(false);
    const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(contextMenu === null
            ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }
            : null
        );
    };
    const handleClose = () => setContextMenu(null);

    return (
        <Box
            onMouseEnter={() => setShowPlayButton(true)}
            onMouseLeave={() => setShowPlayButton(false)}
            onContextMenu={handleContextMenu}
            onClick={() => navigate("playlist/" + playlist.id)}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'rgba(206,206,206,0.05)',
                transition: 'background-color 0.3s',
                '&:hover': { bgcolor: 'rgba(206,206,206,0.1)' },
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
                flexGrow: 1,
                width: '100%',
            }}
        >
            {/* Album image */}
            <Box sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
            }}>
                <img
                    src={playlist.image}
                    alt={playlist.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* Play/Pause button in corner */}
                <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                    {isPlaying
                        ? <PauseButton size="medium" onClick={e => { e.stopPropagation(); onPause(); }} />
                        : showPlayButton
                            ? <PlayButton size="medium" onClick={e => { e.stopPropagation(); onPlay(playlist.tracks[0]); }} />
                            : null
                    }
                </Box>
            </Box>

            {/* Text */}
            <Box sx={{ px: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {playlist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {playlist.description.length <= 18 ? playlist.description : playlist.description.substr(0, 18) + '...'}
                </Typography>
            </Box>
        </Box>
    );
}
