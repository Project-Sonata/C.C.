import React from 'react';
import { Box, Typography } from '@mui/material';
import { Track } from "../model/Track";
import {MarqueeText} from "./MarqueeText";

interface Props {
    track: Track;
}

function MediaItem({ track }: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                padding: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    transform: 'scale(1.02)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 2,
                    width: 56,
                    height: 56,
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.3)',
                    transition: 'box-shadow 0.2s ease',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.5)',
                    }
                }}
            >
                <img
                    src={track.imageUrl}
                    width={56}
                    height={56}
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <MarqueeText text={track.name} maxWidth={180} variant="body1" />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {track.author.name}
                </Typography>
            </Box>
        </Box>
    );
}

export default MediaItem;
