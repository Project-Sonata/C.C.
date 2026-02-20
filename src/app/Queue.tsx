import React from 'react';
import useQueue from "../hooks/useQueue";
import { TrackItem } from "../components/TrackItem";
import { Box, Typography, Divider, Button, Container } from "@mui/material";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import usePlayer from "../hooks/usePlayer";
import useOnPlay from "../hooks/useOnPlay";

const Queue = () => {
    const queue = useQueue();
    const player = usePlayer();
    const onPlay = useOnPlay(queue.tracks);

    const nextTracks = queue.nextTracks();

    const handleClearQueue = () => {
        if (queue.currentTrack) {
            // Keep only the current track in the queue
            const current = queue.currentTrack;
            queue.clear();
            queue.setCurrentTrack(current);
            queue.add(current);
        } else {
            queue.clear();
        }
    };

    if (!queue.currentTrack && queue.tracks.length === 0) {
        return (
            <Box sx={{ 
                height: '70vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center'
            }}>
                <QueueMusicIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3 }} />
                <Typography variant="h5" color="text.secondary" fontWeight={500}>
                    Your queue is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 300 }}>
                    Add some tracks to keep the music playing.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                    <Typography variant="h4" fontWeight={700}>
                        Queue
                    </Typography>
                    {nextTracks.length > 0 && (
                        <Button 
                            variant="text" 
                            color="inherit" 
                            onClick={handleClearQueue}
                            sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                        >
                            Clear queue
                        </Button>
                    )}
                </Box>

                {queue.currentTrack && (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Now Playing
                        </Typography>
                        <TrackItem 
                            index={1} 
                            track={queue.currentTrack} 
                            isActive={player.isActive} 
                            isCurrentlyPlaying={true} 
                            onPlayRequested={onPlay}
                        />
                    </Box>
                )}

                <Divider sx={{ my: 4, opacity: 0.1 }} />

                <Box>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Next up
                    </Typography>
                    {nextTracks.length === 0 ? (
                        <Typography color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>
                            No more tracks in queue
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {nextTracks.map((track, index) => (
                                <TrackItem 
                                    key={`${track.id}-${index}`}
                                    index={index + 2} 
                                    track={track}
                                    isCurrentlyPlaying={false}
                                    isActive={false}
                                    onPlayRequested={() => onPlay(track)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Queue;
