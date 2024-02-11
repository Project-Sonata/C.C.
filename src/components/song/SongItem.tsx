import * as React from 'react';
import {Track} from "../../model/Track";
import {Box, Typography, useTheme} from "@mui/material";
import {Image} from "@mui/icons-material";
import {PlayButton} from "../PlayButton";
import {useState} from "react";
import usePlayer from "../../hooks/usePlayer";

type Props = {
    track: Track
};

export function SongItem(props: Props) {
    const theme = useTheme()
    const track = props.track;

    const [showPlayButton, setShowPlayButton] = useState(false)
    const player = usePlayer()
    return (
        <Box
            onMouseEnter={() => setShowPlayButton(true)}
            onMouseLeave={() => setShowPlayButton(false)}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                gap: theme.spacing(1),
                // backgroundColor: 'rgba(206, 206, 206, 0.05)',
                backgroundColor: 'green',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                padding: theme.spacing(1.5),
                '&:hover': {
                    backgroundColor: 'rgba(206, 206, 206, 0.1)',
                }
            }}>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                aspectRatio: '1',
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
            }}>
                <img src={track.imageUrl} width={50}
                     height={50}
                     style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                     }}/>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="start" width="100%" paddingTop={0} gap={0}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {track.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                    By {track.author.name}
                </Typography>
            </Box>

            <Box position={"absolute"} sx={{
                bottom: "90px",
                right: "15px",
                color: 'red'
            }}>
                {(showPlayButton) ?
                    <PlayButton onClick={(event) => {
                        player.setId(track.id)
                        player.setCurrentTrack(track)
                    }}/> :
                    <div/>}
            </Box>

        </Box>

    );
};