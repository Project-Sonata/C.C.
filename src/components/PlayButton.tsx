import * as React from 'react';
import {Box, Button} from "@mui/material";
import {Track} from "../model/Track";
import {PlayArrow, PlayCircle} from "@mui/icons-material";
import {ButtonProps} from "@mui/material/Button/Button";
import {BoxProps} from "@mui/material/Box/Box";

type Props = {
    buttonProps?: ButtonProps,
    boxProps?: BoxProps,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const PlayButton = ({onClick, boxProps, buttonProps}: Props) => {
    return (
        <Box
            sx={{
                transition: 'opacity 0.3s, transform 0.3s',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#4CAF50',
                padding: 0,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(25%)',
                opacity: 1,
                scale: 1.1,
            }}
            {...boxProps}
        >
            <Button
                sx={{
                    minWidth: 0,
                    minHeight: 0,
                    padding: 0,
                }}
                onClick={onClick}
                {...buttonProps}
            >
                <PlayArrow sx={{ fontSize: 32, color: 'black'}}/>
            </Button>
        </Box>
    );
};