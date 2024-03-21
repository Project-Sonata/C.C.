import * as React from 'react';
import {Box, Typography} from "@mui/material";
import {Playlist} from "../model/Playlist";
// import { average, prominent } from 'color.js'
import {useState} from "react";
import Color, {useColor} from "color-thief-react";

type Props = {
    playlist: Playlist
};

export const PlaylistHeader = ({playlist: {description, image, name}}: Props) => {
    const {data, loading, error} = useColor(image, "hex", {crossOrigin: ""})
    console.log(data, loading, error)
    return (
        <Box display={"flex"} width={"100%"} height={"30%"} sx={{
            background: data

        }}>
            <Box sx={{
                padding: "20px"
            }}>
                <img height={200} width={200} src={image}></img>
            </Box>
            <Box flexDirection="column" paddingTop={"3%"}>
                <Box>
                    Public Playlist
                </Box>
                <Box>
                    <Typography variant={"h2"}>{name}</Typography>
                    <Typography>{description}</Typography>
                </Box>
                <Typography paddingTop={"5%"}>
                    Made for ODEYALO
                </Typography>
            </Box>
        </Box>
    );
}