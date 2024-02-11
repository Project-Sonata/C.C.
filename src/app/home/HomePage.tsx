import * as React from 'react';
import {getSongsForUser} from "../../actions/getSongsForUser";
import {HomePageContent} from "./HomePageContent";
import {Track} from "../../model/Track";
import {useEffect, useState} from "react";

type Props = {};

export default function HomePage(props: Props) {
    const [songs, setSongs] = useState<Track[]>([]);

    useEffect(() => {
        getSongsForUser('123')
            .then((data) => {
                setSongs(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <HomePageContent tracks={songs}/>
        </div>
    );
};