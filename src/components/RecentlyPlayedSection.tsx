import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import RecentlyPlayedCard, {Type} from "./RecentlyPlayedItem";
import {Track} from "../model/Track";
import usePlayer from "../hooks/usePlayer";

type Props = {
    tracks: Track[];
};

export const RecentlyPlayedSection = ({tracks}: Props) => {
    const player = usePlayer();

    if (tracks.length === 0) return null;

    return (
        <Box sx={{ pt: 2, px: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recently Played
            </Typography>
            <Grid container spacing={2}>
                {tracks.map(track => (
                    <Grid key={track.id} item xs={12} sm={6} md={3}>
                        <RecentlyPlayedCard
                            name={track.album.name}
                            imageUrl={track.imageUrl}
                            type={Type.ALBUM}
                            tracks={[track]}
                            id={track.album.id}
                            contextUri={`sonata:album:${track.album.id}`}
                            isPlaying={player.context === `sonata:album:${track.album.id}` && player.isActive}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};