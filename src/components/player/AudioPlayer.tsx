import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import AudioPlayerContent from "./AudioPlayerContent";
import usePlayer from "../../hooks/usePlayer";
import useQueue from "../../hooks/useQueue";
import useDevices from "../../hooks/useDevices";
import getDevicesForUser from "../../actions/getDevicesForUser";
import { Device } from "../../model/Device";
import { usePlayerSynchronization } from "../../hooks/usePlayerSynchronization";

function AudioPlayer() {
    const player = usePlayer();
    const queue = useQueue();
    const devicesHook = useDevices();
    const [devices, setDevices] = useState<Device[]>([]);

    const currentTrack = player.currentTrack;

    usePlayerSynchronization();

    useEffect(() => {
        getDevicesForUser().then(value => setDevices(value));
    }, []);

    useEffect(() => {
        devices
            .filter(value => value.active)
            .forEach(activeDevice => devicesHook.setActiveDevice(activeDevice));

        const inactiveDevices = devices.filter(value => !value.active);
        devicesHook.setInactiveDevices(inactiveDevices);
    }, [devices]);

    if (!currentTrack || !player.activeId) {
        return null;
    }

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                height: "100px",
                width: "100%",
                backgroundColor: "black",
                pt: 1,
                pb: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.5)",
                zIndex: 1200,
            }}
        >
            <AudioPlayerContent
                key={player.activeId + queue.currentIndex}
                song={currentTrack}
                isActive={player.isActive}
            />
        </Box>
    );
}

export default AudioPlayer;