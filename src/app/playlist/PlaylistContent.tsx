import * as React from 'react';
import {Box} from "@mui/material";
import {PlaylistHeader} from "../../components/PlaylistHeader";
import {TrackItem} from "../../components/TrackItem";
import {Playlist} from "../../model/Playlist";
import usePlayer from "../../hooks/usePlayer";
import useOnPlay from "../../hooks/useOnPlay";
import {PlaylistOptions} from "./PlaylistOptions";

type Props = {
    playlist: Playlist
};
export const PlaylistContent = ({playlist}: Props) => {
    const player = usePlayer();
    const onPlay = useOnPlay(playlist.tracks, playlist.context);

    return (
        <Box>
            <PlaylistHeader playlist={playlist}/>
            <PlaylistOptions playlist={playlist}/>
            <Box>
                {
                    playlist.tracks.map((track, index) => <TrackItem index={index + 1} track={track}
                                                                     isCurrentlyPlaying={player.context === playlist.context && track.id === player.activeId}
                                                                     isActive={player.context === playlist.context && track.id === player.activeId && player.isActive}
                                                                     onPlayRequested={onPlay}/>)
                }
            </Box>
        </Box>
    );
};