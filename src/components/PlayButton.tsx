import * as React from 'react';
import {Box, Button} from "@mui/material";
import {Track} from "../model/Track";
import {PlayCircle} from "@mui/icons-material";

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const PlayButton = (props: Props) => {
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
        >
            <Button
                sx={{
                    minWidth: 0,
                    minHeight: 0,
                    padding: 0,
                }}
                onClick={props.onClick}
            >
                <PlayCircle sx={{ fontSize: 32, color: 'black'}}/>
            </Button>
        </Box>
    );
};