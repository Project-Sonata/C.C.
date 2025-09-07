import * as React from 'react';
import {getSongsForUser} from "../../actions/getSongsForUser";
import {HomePageContent} from "./HomePageContent";
import {Track} from "../../model/Track";
import {useEffect, useState} from "react";
import {Playlist} from "../../model/Playlist";
import {getPlaylistsForUser} from "../../actions/getPlaylistsForUser";

type Props = {};


export default function HomePage(props: Props) {
    const [songs, setSongs] = useState<Track[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        getSongsForUser('123')
            .then((data) => {
                setSongs(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        getPlaylistsForUser('123')
            .then((data) => {
                setPlaylists(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <HomePageContent tracks={songs} playlists={playlists}/>
        </div>
    );
};