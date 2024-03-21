import * as React from 'react';
import {Playlist} from "../../model/Playlist";
import {Box, Typography} from "@mui/material";
import {Track} from "../../model/Track";
import {useParams} from "react-router-dom";
import {PlaylistContent} from "./PlaylistContent";
import {getPlaylist} from "../../MockedPlaylistStore";

type Props = {};

export const PlaylistPage = (props: Props) => {
    const {playlistId} = useParams()

    if (!playlistId) {
        return <Box>
            <Typography>Failed to load the resource. No playlist ID!</Typography>
        </Box>
    }

    const playlistTarget = getPlaylist(playlistId);

    if (!playlistTarget) {
        return <Box>
            <Typography>Ooops, playlist does not exist!</Typography>
        </Box>
    }

    return (
        <Box>
            <PlaylistContent playlist={playlistTarget}/>
        </Box>
    );
};