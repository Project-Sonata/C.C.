import * as React from 'react';
import {Box} from "@mui/material";
import {PlayButton} from "../../components/PlayButton";
import {Playlist} from "../../model/Playlist";
import useQueue from "../../hooks/useQueue";
import useOnPlay from "../../hooks/useOnPlay";
import useOnPause from "../../hooks/useOnPause";
import usePlayer from "../../hooks/usePlayer";
import {PauseButton} from "../../components/PauseButton";

type Props = {
    playlist: Playlist
};
export const PlaylistOptions = ({playlist}: Props) => {
    const tracks = playlist.tracks;
    const playlistContext = "sonata:playlist:" + playlist.id;
    const player = usePlayer()
    const onPlay = useOnPlay(tracks, playlistContext);
    const onPause = useOnPause()
    console.log(player)
    return (
        <Box>
            <Box sx={{
                position: 'relative',
                height: '50px',
                width: '50px',
                display: 'inline-block'
            }}>
                {
                    player.context === playlistContext ?
                        player.isActive ? <PauseButton onClick={onPause}/> :
                            <PlayButton onClick={() => onPlay()}/>
                        : <PlayButton onClick={() => onPlay(tracks[0])}/>
                }

            </Box>
        </Box>
    );
};