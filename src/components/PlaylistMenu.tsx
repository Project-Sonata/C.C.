// @flow
import * as React from 'react';
import {Playlist} from "../model/Playlist";
import {Box, Menu, MenuItem, MenuProps} from "@mui/material";
import useQueue from "../hooks/useQueue";

type Props = {
    playlist: Playlist
    menuProps: MenuProps,
    handleClose: () => void;
};

export const PlaylistMenu = ({handleClose, menuProps, playlist}: Props) => {
    const queue = useQueue();

    function handleAddToQueue(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        event.stopPropagation()
        playlist.tracks.forEach(track => queue.add(track))
        handleClose()
    }

    return (
        <Box>
            <Menu {...menuProps}>
                <MenuItem onClick={event => handleAddToQueue(event)}>Add to queue</MenuItem>

            </Menu>
        </Box>
    );
};