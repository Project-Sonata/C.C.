import React, { ElementType } from 'react';
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from '@mui/material/Tooltip';

type SidebarButtonProps = {
    text: string,
    link?: string,
    Icon: ElementType,
    collapsed?: boolean,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
    onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const SidebarButtonItem = ({ link, Icon, text, collapsed, onClick, onContextMenu }: SidebarButtonProps) => {
    const content = (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 1.5 : 2.5,
                }}
                onClick={onClick}
                onContextMenu={onContextMenu}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 40, // fixed width for all icons
                        justifyContent: 'center',
                    }}
                >
                    <Icon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={text} />}
            </ListItemButton>
        </ListItem>
    );

    return (
        <Tooltip title={collapsed ? text : ''} placement="right">
            {link ? <Link to={link} style={{ textDecoration: 'none', color: "white" }}>{content}</Link> : content}
        </Tooltip>
    );
}

export default SidebarButtonItem;
