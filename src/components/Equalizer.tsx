import * as React from 'react';
import {Box} from "@mui/material";
import './Equalizer.css'

type Props = {
    height?: string
    width?: string,
    barWidth?: string,
};

export const Equalizer = ({height, width, barWidth}: Props) => {
    return (
        <Box className="soundwave-container" sx={{
            height: height || '30px',
            width: width || 'auto',
        }}>
            <Box className="bar" sx={{
                width: barWidth || '2px',
            }}/>
            <Box className="bar" sx={{
                width: barWidth || '2px',
            }}/>
            <Box className="bar" sx={{
                width: barWidth || '2px',
            }}/>
            <Box className="bar" sx={{
                width: barWidth || '2px',
            }}/>
        </Box>
    );
};