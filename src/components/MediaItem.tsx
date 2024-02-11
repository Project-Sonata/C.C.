import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Track} from "../model/Track";

interface Props {
    track: Track
}

function MediaItem({track}: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                width: '100%',
                padding: 2,
                borderRadius: 'md',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 'md',
                    minHeight: 48,
                    minWidth: 48,
                    overflow: 'hidden',
                }}
            >
                <img
                    src={track.imageUrl}
                    width={50}
                    height={50}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden' }}>
                <Typography variant="body1" color="textPrimary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {track.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    By {track.author.name}
                </Typography>
            </Box>
        </Box>
    );
};

export default MediaItem;