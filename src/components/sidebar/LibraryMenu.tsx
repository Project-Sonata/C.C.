// @flow
import * as React from 'react';
import {Box, Menu, MenuItem, MenuProps} from "@mui/material";
import useQueue from "../../hooks/useQueue";
import {useEffect, useState} from "react";
import {Playlist} from "../../model/Playlist";
import {addToPlaylist, getPlaylists} from "../../MockedPlaylistStore";
import {IconMenuItem, NestedMenuItem} from "mui-nested-menu";
import {Add, PlaylistAdd, QueueMusic} from "@mui/icons-material";
import {CreatePlaylistModal} from "../CreatePlaylistModal";

type Props = {
    menuProps: MenuProps,
};

export const LibraryMenu = ({menuProps}: Props) => {
    const [open, setOpen] = useState(false)

    function handleCreatePlaylist() {
        setOpen(true)
    }

    return (
        <Box>
            <Menu{...menuProps}>
                <IconMenuItem leftIcon={<Add/>} onClick={handleCreatePlaylist} label={"Create playlist"}/>
                <CreatePlaylistModal isOpen={open} onClose={() => setOpen(false)}/>
            </Menu>
        </Box>
    )
};