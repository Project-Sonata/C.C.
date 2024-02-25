import React, {useEffect, useState} from 'react';
import AudioPlayerContent from "./AudioPlayerContent";
import usePlayer from "../../hooks/usePlayer";
import useQueue from "../../hooks/useQueue";
import useDevices from "../../hooks/useDevices";
import getDevicesForUser from "../../actions/getDevicesForUser";
import {Device} from "../../model/Device";

function AudioPlayer() {
    const player = usePlayer()
    const queue = useQueue()
    const currentTrack = player.currentTrack
    const devicesHook = useDevices()
    const [devices, setDevices] = useState<Device[]>([])

    useEffect(() => {
        getDevicesForUser()
            .then(value => setDevices(value));
    }, [])

    useEffect(() => {
        devices.filter(value => value.active).map(activeDevice => devicesHook.setActiveDevice(activeDevice))
        const inactiveDevices = devices.filter(value => !value.active)

        devicesHook.setInactiveDevices(inactiveDevices)
    }, [devices])


    if (!currentTrack || !player.activeId) {
        return <div></div>;
    }

    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            height: "100px",
            width: "100%",
            backgroundColor: "black",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem"
        }}>
            <AudioPlayerContent key={player.activeId + queue.currentIndex} song={currentTrack}
                                isActive={player.isActive}/>
        </div>
    );
}

export default AudioPlayer;