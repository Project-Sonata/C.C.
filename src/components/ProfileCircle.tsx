import React, { useState } from "react";
import { Avatar, IconButton, Box, MenuItem, Paper, ClickAwayListener, Popper, Grow } from "@mui/material";

type Props = {
    userName: string;
    avatarUrl?: string;
    onLogout: () => void;
};

export const ProfileCircle = ({ userName, avatarUrl, onLogout }: Props) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => !prev);
    };

    const handleClose = () => setOpen(false);

    const handleProfile = () => {
        console.log("Profile clicked");
        handleClose();
    };

    const handleLogout = () => {
        onLogout();
        handleClose();
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box>
                <IconButton onClick={handleToggle} sx={{ p: 0 }}>
                    <Avatar src={avatarUrl}>{!avatarUrl && userName[0]}</Avatar>
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: "top right" }}>
                            <Paper elevation={3}>
                                <Box display="flex" flexDirection="column">
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Box>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};
