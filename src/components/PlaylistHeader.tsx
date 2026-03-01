import * as React from 'react';
import {Box, Typography} from "@mui/material";
import {Playlist} from "../model/Playlist";
import {useColor} from "color-thief-react";

type Props = {
    playlist: Playlist;
};

const fallbackImage = "/default-playlist-cover.png"; // replace with actual fallback image path
const fallbackBackground = "#1c1a1a"; // neutral dark gray fallback

export const PlaylistHeader = ({playlist: {description, image, name}}: Props) => {
    const validImage = image ?? fallbackImage;
    const {data: color, loading, error} = useColor(image || "", "hex", {crossOrigin: ""});

    const background = image && color && !loading && !error ? color : fallbackBackground;

    return (
        <Box
            display="flex"
            width="100%"
            height="30%"
            sx={{ background }}
        >
            <Box sx={{ padding: "20px" }}>
                <img
                    height={200}
                    width={200}
                    src={validImage}
                    alt="Playlist cover"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                />
            </Box>

            <Box flexDirection="column" paddingTop="3%">
                <Box>Public Playlist</Box>
                <Box>
                    <Typography variant="h2">{name}</Typography>
                    <Typography>{description}</Typography>
                </Box>
                <Typography paddingTop="5%">
                    Made for ODEYALO
                </Typography>
            </Box>
        </Box>
    );
};
