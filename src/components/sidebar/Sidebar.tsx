import * as React from 'react';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SidebarButtonItem from "./SidebarButtonItem";
import { Library } from "./Library";
import {useState} from "react";

const drawerWidth = 240;
const collapsedWidth = 60;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    width: 60, // keep icons visible
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open ? openedMixin(theme) : closedMixin(theme)),
        '& .MuiDrawer-paper': open ? openedMixin(theme) : closedMixin(theme),
    }),
);

export default function Sidebar() {

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ position: 'relative' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : collapsedWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : collapsedWidth,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                        bgcolor: '#121212',
                        color: 'white',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <Box display="flex" alignItems="center" px={1} py={2} gap={1}>
                    <IconButton onClick={() => setOpen(!open)} sx={{ color: 'white' }}>
                        <MenuIcon />
                    </IconButton>
                    {open && (
                        <Typography variant="h6" noWrap>
                            Sonata
                        </Typography>
                    )}
                </Box>

                <Divider />
                <List>
                    <SidebarButtonItem text="Home" link="/" Icon={HomeIcon} />
                    <SidebarButtonItem text="Search" link="/search" Icon={SearchIcon} />
                </List>
                <Divider />
                <List>
                    <Library />
                </List>
            </Drawer>
        </Box>
    );
}
