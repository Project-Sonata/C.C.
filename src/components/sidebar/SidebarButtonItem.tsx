import React, {ElementType} from 'react';
import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type SidebarButtonProps = {
    text: string,
    link: string,
    Icon: ElementType
}

const SidebarButtonItem = ({link, Icon, text}: SidebarButtonProps) => {
    return (
        <Link to={link} style={{
            textDecoration: 'none',
            color: "white"
        }}>

            <ListItem key={text} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: 'initial',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: 3,
                            justifyContent: 'center',
                        }}>
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{opacity: 1}}/>
                </ListItemButton>
            </ListItem>
        </Link>
    );
}

export default SidebarButtonItem;