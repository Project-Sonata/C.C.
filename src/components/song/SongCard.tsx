import * as React from 'react';
import {useState} from 'react';
import {Track} from "../../model/Track";
import {Box, Typography, useTheme} from "@mui/material";
import {PlayButton} from "../PlayButton";
import {PauseButton} from "../PauseButton";
import {TrackMenu} from "../TrackMenu";
import useOnPlay from "../../hooks/useOnPlay";
import useOnPause from "../../hooks/useOnPause";

type Props = {
    track: Track,
    isPlaying: boolean
};

export function SongCard({track, isPlaying}: Props) {
    const theme = useTheme()
    const onPlay = useOnPlay([], track.context)
    const onPause = useOnPause()

    const [showPlayButton, setShowPlayButton] = useState(false)
    const containerRef = React.useRef<HTMLElement>(null);
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
        setShowPlayButton(false)
    };

    return (
        <Box>
            {/*<TrackMenu track={track}*/}
            {/*           menuProps={{*/}
            {/*               open: contextMenu !== null,*/}
            {/*               onClose: handleClose,*/}
            {/*               anchorReference: "anchorPosition",*/}
            {/*               anchorPosition: contextMenu !== null*/}
            {/*                   ? {top: contextMenu.mouseY, left: contextMenu.mouseX}*/}
            {/*                   : undefined*/}
            {/*           }}*/}
            {/*           handleClose={handleClose}>*/}
                <Box
                    onMouseEnter={() => setShowPlayButton(true)}
                    onMouseLeave={() => setShowPlayButton(false)}
                    onContextMenu={handleContextMenu}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        gap: theme.spacing(1),
                        backgroundColor: 'rgba(206, 206, 206, 0.05)',
                        // backgroundColor: 'green',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        padding: theme.spacing(1.5),
                        '&:hover': {
                            backgroundColor: 'rgba(206, 206, 206, 0.1)',
                        }
                    }} ref={containerRef}>

                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        aspectRatio: '1',
                        borderRadius: theme.shape.borderRadius,
                        overflow: 'hidden',
                    }}>
                        <img src={track.imageUrl} width={50}
                             height={50}
                             style={{
                                 width: '100%',
                                 height: '100%',
                                 objectFit: 'cover',
                             }}/>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="start" width="100%" paddingTop={0} gap={0}>
                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                            {track.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                            By {track.author.name}
                        </Typography>
                    </Box>

                    <Box position={"absolute"} sx={{
                        bottom: "90px",
                        right: "15px",
                        color: 'red',
                        transition: 'opacity 0.3s, transform 0.3s',
                    }}>
                        {isPlaying ?
                            <PauseButton onClick={onPause}/> :
                            showPlayButton ?
                                <PlayButton onClick={() => onPlay(track)}/> : <div/>}
                    </Box>
                    <TrackMenu track={track}
                               menuProps={{
                                   open: contextMenu !== null,
                                   onClose: handleClose,
                                   anchorReference: "anchorPosition",
                                   anchorPosition: contextMenu !== null
                                       ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                                       : undefined
                               }}
                               handleClose={handleClose}>
                    </TrackMenu>
                </Box>
            {/*</TrackMenu>*/}
        </Box>
    );
};