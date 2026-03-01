import React, { useState } from "react";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";

type Props = {
    userName: string;
    avatarUrl?: string;
    onLogout: () => void;
};

export const ProfileCircle = ({ userName, avatarUrl, onLogout }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleProfile = () => {
        navigate("/user/123")
        handleClose();
    };

    const handleLogout = () => {
        onLogout();
        handleClose();
    };

    return (
        <Box>
            <Tooltip title={userName}>
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar src={avatarUrl}>{!avatarUrl && userName[0]}</Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                disableAutoFocusItem
                disableEnforceFocus
                disableRestoreFocus
                MenuListProps={{ disablePadding: true }}
                PaperProps={{
                    sx: {
                        pointerEvents: "auto",
                        bgcolor: "#333", // dark grey background
                        borderRadius: 2,
                        mt: 1, // add margin-top to create space between avatar and menu
                    },
                }}
            >
                <MenuItem
                    onClick={handleProfile}
                    sx={{
                        py: 2,
                        px: 3,
                        fontSize: "1rem",
                        minWidth: 180,
                        color: "white",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            bgcolor: "#555",
                            textDecoration: "underline",
                        },
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        py: 2,
                        px: 3,
                        fontSize: "1rem",
                        minWidth: 180,
                        color: "white",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            bgcolor: "#555",
                            textDecoration: "underline",
                        },
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};
