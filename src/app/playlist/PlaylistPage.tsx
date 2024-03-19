import * as React from 'react';
import {Playlist} from "../../model/Playlist";
import {Box, Typography} from "@mui/material";
import {Track} from "../../model/Track";
import {useParams} from "react-router-dom";
import {PlaylistContent} from "./PlaylistContent";


const track: Track = {
    id: "123",
    name: 'water',
    author: {id: "1", name: "nihigo"},
    imageUrl: 'https://i1.sndcdn.com/artworks-1Ec6ifP1jlIu0IPE-tHDNTQ-t500x500.jpg',
    album: {
        id: '123',
        name: 'nihigo. Collection'
    },
    durationMs: 262000
};
const track2: Track = {
    id: "1234",
    name: 'I don\'t want to ask your father or anything',
    author: {id: "2", name: "Salvia Palth"},
    imageUrl: 'https://f4.bcbits.com/img/a0663846172_16.jpg',
    album: {
        id: '124',
        name: 'melanchole'
    },
    durationMs: 261000
};

type Props = {};

const playlist: Playlist = {
    id: "1",
    name: "Code Geass OST",
    description: "Best songs from Code Geass",
    image: "https://i1.sndcdn.com/artworks-vBv5Vm09cIor-0-t500x500.jpg",
    tracks: [
        track, track2,
    ]
}

const playlist2: Playlist = {
    id: "2",
    name: "Lofi Chill",
    description: "Lofi to chill to",
    image: "https://i.pinimg.com/564x/90/bc/a8/90bca83aa94a664206a7e4c305888023.jpg",
    tracks: [
        track
    ]
}
const cache = new Map<string, Playlist>([
    [playlist.id, playlist],
    [playlist2.id, playlist2],
])


export const PlaylistPage = (props: Props) => {
    const {playlistId} = useParams()

    if (!playlistId) {
        return <Box>
            <Typography>Failed to load the resource. No playlist ID!</Typography>
        </Box>
    }

    const playlistTarget = cache.get(playlistId);

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