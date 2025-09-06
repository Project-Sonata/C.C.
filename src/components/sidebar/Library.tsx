import * as React from 'react';
import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {
    LibraryMusicRounded,
    Add as AddIcon,
} from "@mui/icons-material";
import SidebarButtonItem from "./SidebarButtonItem";
import {LibraryMenu} from "./LibraryMenu";
import {useNavigate} from "react-router-dom";
import createPlaylist, {CreatePlaylistInfo} from "../../actions/createPlaylist";

export const Library = () => {
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const navigate = useNavigate();

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleCreatePlaylist = () => {
        const playlist: CreatePlaylistInfo = {
            name: "My cool playlist"
        }
        createPlaylist(playlist)
            .then(result => result.json())
            .then(data => navigate(`/playlist/${data.id}`));
    };

    return (
        <Box onContextMenu={handleContextMenu} px={1}>
            <SidebarButtonItem text={"Library"} link={"/library"} Icon={LibraryMusicRounded}/>

            <LibraryMenu menuProps={{
                open: contextMenu !== null,
                onClose: handleClose,
                anchorReference: "anchorPosition",
                anchorPosition: contextMenu !== null
                    ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                    : undefined
            }}/>

            {/* Create Playlist */}
            <ListItemButton onClick={handleCreatePlaylist}>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary="Create Playlist"/>
            </ListItemButton>
        </Box>
    );
};