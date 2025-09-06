import {Box, Card, CardMedia, Typography} from "@mui/material";
import {PlayButton} from "./PlayButton";
import useOnPlay from "../hooks/useOnPlay";
import {useState} from "react";
import {Track} from "../model/Track";
import {PauseButton} from "./PauseButton";
import useOnPause from "../hooks/useOnPause";
import {Equalizer} from "./Equalizer";

interface ItemDetails {
    id: string,
    type: Type,
    name: string,
    imageUrl: string,
    contextUri: string,
    tracks: Track[],

    isPlaying: boolean
}

export enum Type {
    ALBUM = "TRACK",
    PLAYLIST = "PLAYLIST"
}

export default function RecentlyPlayedCard({imageUrl, name, contextUri, id, tracks, isPlaying}: ItemDetails) {
    const [hover, setHover] = useState(false);

    const onPlay = useOnPlay([], contextUri);
    const onPause = useOnPause();

    return (
        <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: 60,
                bgcolor: '#1e1e1e',
                color: 'white',
                borderRadius: 2,
                cursor: 'pointer',
                boxShadow: 2,
                transition: 'transform 0.2s ease-in-out',
                ':hover': {transform: 'scale(1.05)', zIndex: 1},
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                sx={{width: 60, height: 60, objectFit: 'cover', flexShrink: 0}}
            />
            <Box sx={{display: 'flex', alignItems: 'center', p: 1, flex: 1}}>
                <Typography variant="body2" noWrap sx={{fontWeight: 500}}>
                    {name}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', pr: 1}}>
                {hover ? (
                    isPlaying ? (
                        <PauseButton size="small" onClick={(event) => {
                            event.stopPropagation();
                            onPause()
                        }}/>
                    ) : (
                        <PlayButton size="small" onClick={(event) => {
                            event.stopPropagation();
                            onPlay(tracks[0]);
                        }}/>
                    )
                ) : (
                    isPlaying && (
                        <Equalizer size="small"/>
                    )
                )}
            </Box>
        </Card>
    );
}