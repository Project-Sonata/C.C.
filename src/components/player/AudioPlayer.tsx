import React from 'react';
import AudioPlayerContent from "./AudioPlayerContent";
import usePlayer from "../../hooks/usePlayer";
import {Track} from "../../model/Track";

function AudioPlayer() {
    const player = usePlayer()
    const currentTrack = player.currentTrack
    console.log(currentTrack)
    if (!currentTrack) {
        return <div></div>;
    }

    return (
        <div id={"hello"}
             style={{
                 position: "absolute",
                 top: 'auto',
                 bottom: 0,
                 height: "15%",
                 width: "100%",
                 backgroundColor: "black",
                 paddingTop: "0.5rem",
                 paddingBottom: "0.5rem"
             }}>
            <AudioPlayerContent key={player.activeId} song={currentTrack}/>
        </div>
    );
}

export default AudioPlayer;