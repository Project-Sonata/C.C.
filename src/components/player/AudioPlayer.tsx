import React, {useEffect, useState} from 'react';
import AudioPlayerContent from "./AudioPlayerContent";
import usePlayer from "../../hooks/usePlayer";
import useQueue from "../../hooks/useQueue";
import useDevices from "../../hooks/useDevices";
import getDevicesForUser from "../../actions/getDevicesForUser";
import {Device} from "../../model/Device";
import {socket} from "../../ws/socket";
import {CurrentPlayerState, EventType, PlayerEvent} from "../../model/PlayerEvent";
import useWebSocket from "react-use-websocket";

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


    const  {lastMessage, sendMessage, readyState} = useWebSocket("ws://localhost:8080/v1/player/sync?token=token1")

    useEffect(() => {
        if (lastMessage !== null) {
            const body =  parsePlayerStateDto(lastMessage.data)

            if (body.getCurrentPlayerState().isPlaying) {
                player.setIsActive(true)
            }
            if (!body.getCurrentPlayerState().isPlaying) {
                player.setIsActive(false)
            }

            console.log(body.getEventType())
        }
    }, [lastMessage]);



    function parsePlayerStateDto(json: string): PlayerEvent {
        const parsedJson = JSON.parse(json);
        const playerState: CurrentPlayerState = {
            devices: parsedJson.player_state.devices,
            isPlaying: parsedJson.player_state.is_playing,
            repeatState: parsedJson.player_state.repeatState,
            shuffleState: parsedJson.player_state.shuffleState,
            currentlyPlayingType: parsedJson.player_state.currentlyPlayingType,
            progressMs: parsedJson.player_state.progressMs,
            playingItem: parsedJson.player_state.playingItem
        };

        const event: PlayerEvent = {
            getCurrentPlayerState(): CurrentPlayerState {
                return playerState;
            },
            getDeviceThatChanged(): string {
                return parsedJson.device_that_changed;
            },
            getEventType(): EventType {
                return parsedJson.event_type;
            }

        }

        return event;
    }

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