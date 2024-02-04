import React from 'react';
import AudioPlayerContent from "./AudioPlayerContent";
import usePlayer from "../../hooks/usePlayer";

function AudioPlayer() {
    const player = usePlayer()
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
                <AudioPlayerContent song={{key: "odeyalo"}} songUrl={"./test.mp3"}></AudioPlayerContent>
            </div>

    );
}

export default AudioPlayer;