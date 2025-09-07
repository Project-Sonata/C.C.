import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import {Playlist} from "../model/Playlist";
import usePlayer from "../hooks/usePlayer";
import {PlaylistCard} from "./PlaylistCard";

type Props = {
    playlists: Playlist[];
};

export const CreatedPlaylistsSection = ({playlists}: Props) => {
    const player = usePlayer();

    if (playlists.length === 0) return null;

    return (
        <Box sx={{ pt: 2, px: 2, mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Playlists you created
            </Typography>
            <Grid container spacing={2}>
                {playlists.map(p => (
                    <Grid key={p.id} item xs={6} sm={4} md={3} lg={2}>
                        <PlaylistCard playlist={p} isPlaying={player.context === p.context && player.isActive} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};