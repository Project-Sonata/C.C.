// @flow
import * as React from 'react';
import {Box} from "@mui/material";
import {LibraryMusicRounded} from "@mui/icons-material";
import SidebarButtonItem from "./SidebarButtonItem";
import {LibraryMenu} from "./LibraryMenu";

type Props = {};

export const Library = (props: Props) => {
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
    };


    return (
        <Box onContextMenu={handleContextMenu}>
            <SidebarButtonItem text={"Library"} link={"/library"} Icon={LibraryMusicRounded}/>
            <LibraryMenu menuProps={{
                open: contextMenu !== null,
                onClose: handleClose,
                anchorReference: "anchorPosition",
                anchorPosition: contextMenu !== null
                    ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                    : undefined
            }}/>
        </Box>
    );
};