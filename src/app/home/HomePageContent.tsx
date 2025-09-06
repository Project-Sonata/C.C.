import * as React from 'react';
import {Track} from "../../model/Track";
import {SongCard} from "../../components/song/SongCard";
import {Box, Grid, Typography} from "@mui/material";
import usePlayer from "../../hooks/usePlayer";
import {Playlist} from "../../model/Playlist";
import {PlaylistCard} from "../../components/PlaylistCard";
import RecentlyPlayedCard, {Type} from "../../components/RecentlyPlayedItem";

type Props = {
    tracks: Track[],
    playlists: Playlist[]
};

export const HomePageContent = (props: Props) => {
    const player = usePlayer()
    if (props.tracks.length === 0) {
        return (
            <div>
                <h1>No songs!</h1>
            </div>
        )
    }
    return (
        <Box>
            <Box sx={{ pt: 2, px: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Recently Played
                </Typography>
                <Grid container spacing={2}>
                    {props.tracks.map(track => (
                        <Grid key={track.id} item xs={12} sm={6} md={3}>
                            <RecentlyPlayedCard name={track.album.name}
                                                imageUrl={track.imageUrl}
                                                type={Type.ALBUM}
                                                tracks={[track]}
                                                id={track.album.id}
                                                contextUri={`sonata:album:${track.album.id}`}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box>
                <Typography>Playlists you created</Typography>
                <Grid container spacing={2}>
                    {
                        props.playlists.map(
                            playlist =>
                                <Grid key={playlist.id} item xs={2}>
                                    <PlaylistCard playlist={playlist}
                                                  isPlaying={player.context === playlist.context && player.isActive}/>
                                </Grid>
                            )
                    }
                </Grid>
            </Box>
        </Box>
    );
};