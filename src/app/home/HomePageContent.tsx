import * as React from 'react';
import {Track} from "../../model/Track";
import {SongCard} from "../../components/song/SongCard";
import {Box, Grid, Typography} from "@mui/material";
import usePlayer from "../../hooks/usePlayer";
import {Playlist} from "../../model/Playlist";
import {PlaylistCard} from "../../components/PlaylistCard";

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
            <Grid container spacing={2}>
                {props.tracks.map(
                    track =>
                        <Grid key={track.id} item xs={2}>
                            <SongCard track={track} isPlaying={player.activeId === track.id && player.isActive}/>
                        </Grid>
                )}
            </Grid>
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