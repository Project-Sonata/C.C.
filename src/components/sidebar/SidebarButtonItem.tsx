import React, { ElementType } from 'react';
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from '@mui/material/Tooltip';

type SidebarButtonProps = {
    text: string,
    link: string,
    Icon: ElementType,
    collapsed?: boolean
}

const SidebarButtonItem = ({ link, Icon, text, collapsed }: SidebarButtonProps) => {
    return (
        <Tooltip title={collapsed ? text : ''} placement="right">
            <Link to={link} style={{ textDecoration: 'none', color: "white" }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: collapsed ? 'center' : 'initial', px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 3, justifyContent: 'center' }}>
                            <Icon />
                        </ListItemIcon>
                        {!collapsed && <ListItemText primary={text} />}
                    </ListItemButton>
                </ListItem>
            </Link>
        </Tooltip>
    );
}

export default SidebarButtonItem;
