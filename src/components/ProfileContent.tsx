// ProfileContent.tsx
import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Grid, Link } from "@mui/material";
import { PlaylistCard } from "../components/PlaylistCard";
import { Playlist } from "../model/Playlist";

type Props = {
    user: {
        name: string;
        avatarUrl?: string;
        followers: number;
        following: number;
        playlists: Playlist[];
    };
};

export const ProfileContent: React.FC<Props> = ({ user }) => {
    const [showAll, setShowAll] = useState(false);
    const publicPlaylistsCount = user.playlists.length;

    const playlistsToShow = showAll ? user.playlists : user.playlists.slice(0, 6);

    return (
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Top section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Avatar
                    src={user.avatarUrl}
                    sx={{
                        width: 200,
                        height: 200,
                        mb: 2,
                    }}
                >
                    {!user.avatarUrl && user.name[0]}
                </Avatar>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Profile
                    </Typography>
                    <Typography variant="h3" fontWeight={700}>
                        {user.name}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                        {publicPlaylistsCount > 0 && (
                            <Typography variant="body2">
                                {publicPlaylistsCount} public playlist{publicPlaylistsCount > 1 ? 's' : ''}
                            </Typography>
                        )}
                        <Typography variant="body2">{user.followers} followers</Typography>
                        <Typography variant="body2">{user.following} following</Typography>
                    </Box>

                    <Button variant="outlined" sx={{ mt: 2 }}>
                        Follow
                    </Button>
                </Box>
            </Box>

            {/* User Playlists */}
            {publicPlaylistsCount > 0 && (
                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Playlists
                    </Typography>

                    <Grid container spacing={2}>
                        {playlistsToShow.map((playlist) => (
                            <Grid key={playlist.id} item xs={12} sm={4} md={2}>
                                <PlaylistCard playlist={playlist} isPlaying={false} />
                            </Grid>
                        ))}
                    </Grid>

                    {!showAll && publicPlaylistsCount > 6 && (
                        <Box sx={{ mt: 2 }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => setShowAll(true)}
                                sx={{ fontWeight: 600 }}
                            >
                                Show all
                            </Link>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};
