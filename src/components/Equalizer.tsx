import * as React from 'react';
import { Box } from "@mui/material";
import './Equalizer.css';

type Props = {
    size?: 'small' | 'medium' | 'large';
};

const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
};

export const Equalizer = ({ size = 'small' }: Props) => {
    const containerSize = sizeMap[size];

    return (
        <Box
            sx={{
                width: containerSize,
                height: containerSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                className="soundwave-container"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: containerSize / 2,
                    height: '100%'
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <Box
                        key={i}
                        className="bar"
                        sx={{
                            width: 2,
                            transformOrigin: 'center'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};
