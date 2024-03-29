import * as React from 'react';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SidebarButtonItem from "./SidebarButtonItem";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    position: "relative",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer)(
    ({theme}) => ({
        width: drawerWidth,
        flexShrink: 0,
        // hardcoded but i don't give a shit how to fix this stuff
        height: "93%",
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
);

export default function MiniDrawer() {
    const open = true;

    return (
        <Box sx={{display: 'flex', height: "full"}}>
            <CssBaseline/>
            <Drawer variant="permanent" anchor={"left"} open={open} sx={{
                display: "flex"
            }}>

                <Box textAlign={"center"}>
                    <Typography variant={"h5"} padding={"10px"}>Sonata</Typography>
                </Box>

                <Divider></Divider>

                <List>
                    <SidebarButtonItem text={"Home"} link={"/"} Icon={HomeIcon}/>
                    <SidebarButtonItem text={"Search"} link={"/search"} Icon={SearchIcon}/>
                </List>
                <Divider/>
            </Drawer>
        </Box>
    );
}