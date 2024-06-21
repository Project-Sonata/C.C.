// @flow
import * as React from 'react';
import {Box, Button, Input, Modal, TextField, Typography} from "@mui/material";
import {useState} from "react";
import createPlaylist from "../actions/createPlaylist";
import {useNavigate} from "react-router-dom";

type Props = {
    isOpen: boolean,
    onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
    }['bivarianceHack'];
};

export const CreatePlaylistModal = ({isOpen, onClose}: Props) => {
    const [playlistName, setPlaylistName] = useState('')

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const navigate = useNavigate();
    function onCreatePlaylist() {
        if (onClose) {
            onClose({}, "escapeKeyDown")
        }
        createPlaylist({
            name: playlistName
        }).then(resp => resp.json())
            .then(body => {
                // @ts-ignore
                const playlistId = body.id;

                navigate('/playlist/'  + playlistId)
            })
    }

    return (
        <Box>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Box >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create a playlist
                        </Typography>
                        <TextField label={"Playlist name"} onChange={event => setPlaylistName(event.target.value)}/>

                    </Box>
                    <Box sx={{
                        padding: "10px"
                    }}>
                        <Button variant={"outlined"} onClick={onCreatePlaylist}>Create</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};