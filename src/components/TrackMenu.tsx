// @flow
import Box from '@mui/material/Box';
import * as React from 'react';
import {Menu, MenuItem, MenuProps} from "@mui/material";
import {Track} from "../model/Track";
import useQueue from "../hooks/useQueue";
import ListItemButton from "@mui/material/ListItemButton";
import {addToPlaylist, getPlaylists} from "../MockedPlaylistStore";
import {useEffect, useState} from "react";
import {Playlist} from "../model/Playlist";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {ContextMenu, IconMenuItem, MenuItemData, NestedMenuItem} from 'mui-nested-menu';
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {PlaylistAdd, QueueMusic} from "@mui/icons-material";

type Props = {
    menuProps: MenuProps,
    track: Track
    handleClose: () => void;
    children?: React.ReactNode;
};
export const TrackMenu = ({track, handleClose, menuProps, children}: Props) => {
    const queue = useQueue()
    const [open, setOpen] = useState(false)
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    const handleAddToQueue = () => {
        queue.add(track)
        handleClose()
    };

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true)
    };
    useEffect(() => {
        setPlaylists(getPlaylists())
    }, [])

    return (
        <Box>
            <Menu{...menuProps}>
                <IconMenuItem leftIcon={<QueueMusic/>} onClick={handleAddToQueue} label={"Add to queue"}/>
                <NestedMenuItem
                    label="Add to playlist"
                    leftIcon={<PlaylistAdd/>}
                    parentMenuOpen={true}>

                    {playlists.map(it => (<MenuItem onClick={() => {
                        handleClose()

                        return addToPlaylist(it.id, track);
                    }}>{it.name}</MenuItem>))}
                </NestedMenuItem>
            </Menu>
        </Box>
    )
};