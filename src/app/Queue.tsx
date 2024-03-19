import React, {useEffect} from 'react';
import useQueue from "../hooks/useQueue";
import {TrackItem} from "../components/TrackItem";
import {Box, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import usePlayer from "../hooks/usePlayer";
import useOnPlay from "../hooks/useOnPlay";

interface Props {
}


function Queue(props: Props) {
    const queue = useQueue()
    const player = usePlayer()
    const onPlay = useOnPlay(queue.tracks)

    if (!queue.currentTrack && queue.tracks.length === 0) {
        return (
            <div>
                Empty queue
            </div>
        )
    }

    if (!queue.currentTrack) {
        return <div></div>
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
            }}>
                <Typography>Currently playing</Typography>
                <TrackItem index={1} track={queue.currentTrack} isActive={player.isActive} isCurrentlyPlaying={true} onPlayRequested={onPlay}/>
            </Box>
            <Divider variant={"fullWidth"}/>

            <Box>
                <Typography>Next up</Typography>
                {
                    queue.nextTracks().length === 0 ?
                        <Typography>Add something to queue</Typography>
                        : queue.nextTracks().map((track, index) =>
                            // Add 2 to index to start indexing from first track after track that is currently playing
                            <TrackItem index={index + 2} track={track}
                                       isCurrentlyPlaying={false}
                                       isActive={false}
                                       onPlayRequested={() => onPlay(track)}
                            />)
                }
            </Box>

        </Box>

    );
}

export default Queue;