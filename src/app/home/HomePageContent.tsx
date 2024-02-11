import * as React from 'react';
import {Track} from "../../model/Track";
import {SongItem} from "../../components/song/SongItem";
import {Grid} from "@mui/material";

type Props = {
    tracks: Track[]
};

export const HomePageContent = (props: Props) => {
    if (props.tracks.length === 0) {
        return (
            <div>
                <h1>No songs!</h1>
            </div>
        )
    }
    return (
        <Grid container spacing={2}>
            {props.tracks.map(
                track =>
                    <Grid item xs={1.5}>
                        <SongItem track={track}/>
                    </Grid>
            )}
        </Grid>
    );
};