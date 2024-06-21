import * as React from 'react';
import {useEffect, useState} from 'react';
import {Playlist} from "../../model/Playlist";
import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {PlaylistContent} from "./PlaylistContent";
import getPlaylistById from "../../actions/getPlaylistById";

type Props = {};

export const PlaylistPage = (props: Props) => {
    const {playlistId} = useParams()
    const [playlist, setPlaylist] = useState<Playlist | null>(null)

    useEffect(() => {
        if (playlistId) {
            getPlaylistById(playlistId).then(playlist => setPlaylist(playlist))
        }
    }, []);

    if (!playlistId) {
        return <Box>
            <Typography>Failed to load the resource. No playlist ID!</Typography>
        </Box>

    }

    if (!playlist) {
        return <Box>
            <Typography>Ooops, playlist does not exist!</Typography>
        </Box>
    }

    return (
        <Box>
            <PlaylistContent playlist={playlist}/>
        </Box>
    );
};