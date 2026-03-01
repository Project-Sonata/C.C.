import * as React from 'react';
import {Track} from "../../model/Track";
import {Box} from "@mui/material";
import {Playlist} from "../../model/Playlist";
import {RecentlyPlayedSection} from "../../components/RecentlyPlayedSection";
import {CreatedPlaylistsSection} from "../../components/CreatedPlaylistsSection";

type Props = {
    tracks: Track[],
    playlists: Playlist[]
};

export const HomePageContent = ({tracks, playlists}: Props) => {
    if (tracks.length === 0 && playlists.length === 0) {
        return <h1>No content!</h1>;
    }

    return (
        <Box>
            <RecentlyPlayedSection tracks={tracks}/>
            <CreatedPlaylistsSection playlists={playlists}/>
        </Box>
    );
};