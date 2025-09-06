import * as React from 'react';
import { Box, Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { ButtonProps } from "@mui/material/Button/Button";
import { BoxProps } from "@mui/material/Box/Box";

type Size = 'small' | 'medium' | 'large';

type Props = {
    size?: Size;
    buttonProps?: ButtonProps;
    boxProps?: BoxProps;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const sizeMap = {
    small: { box: 32, icon: 16 },
    medium: { box: 48, icon: 32 },
    large: { box: 64, icon: 48 },
};

export const PlayButton = ({ onClick, boxProps, buttonProps, size = 'medium' }: Props) => {
    const { box: boxSize, icon: iconSize } = sizeMap[size];

    return (
        <Box
            sx={{
                transition: 'opacity 0.3s, transform 0.3s',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: boxSize,
                height: boxSize,
                backgroundColor: '#4CAF50',
                padding: 0,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                opacity: 1,
                // remove transform translateY, scale for proper centering
            }}
            {...boxProps}
        >
            <Button
                sx={{
                    minWidth: 0,
                    minHeight: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={onClick}
                {...buttonProps}
            >
                <PlayArrow sx={{ fontSize: iconSize, color: 'black' }} />
            </Button>
        </Box>
    );
};