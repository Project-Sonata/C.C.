import useWebSocket from "react-use-websocket";
import {useEffect} from "react";
import {Track} from "../model/Track";
import {CurrentPlayerState, EventType, PlayerEvent} from "../model/PlayerEvent";
import {PlayableItemType, TrackPlayableItem} from "../model/PlayableItem";
import useOnPlay from "./useOnPlay";
import usePlayer from "./usePlayer";

export function usePlayerSynchronization() {

    const {lastMessage} = useWebSocket("ws://localhost:8080/v1/player/sync?token=token1")

    const player = usePlayer()
    const onPlay = useOnPlay([])


    useEffect(() => {
        if (lastMessage !== null) {
            const body = parsePlayerStateDto(lastMessage.data)
            player.setIsActive(body.getCurrentPlayerState().isPlaying)

            onPlay(body.getCurrentPlayerState().playingItem as unknown as Track)

            console.log(body.getEventType())
        }
    }, [lastMessage]);


    function parsePlayerStateDto(json: string): PlayerEvent {
        const parsedJson = JSON.parse(json);

        const track: TrackPlayableItem = {
            id: parsedJson.player_state.playing_item.id,
            context: parsedJson.player_state.playing_item.contextUri,
            durationMs: parsedJson.player_state.playing_item.durationMs,
            album: {
                id: parsedJson.player_state.playing_item.album.id,
                name: parsedJson.player_state.playing_item.album.name,
            },
            name: parsedJson.player_state.playing_item.name,
            author: {
                id: parsedJson.player_state.playing_item.artists[0].id,
                name: parsedJson.player_state.playing_item.artists[0].name,
            },
            imageUrl: parsedJson.player_state.playing_item.album.images[0].url,
            uri: parsedJson.player_state.playing_item.contextUri,

            getPlayingType(): PlayableItemType {
                return PlayableItemType.TRACK
            }
        };

        const playerState: CurrentPlayerState = {
            devices: parsedJson.player_state.devices,
            isPlaying: parsedJson.player_state.is_playing,
            repeatState: parsedJson.player_state.repeatState,
            shuffleState: parsedJson.player_state.shuffleState,
            currentlyPlayingType: parsedJson.player_state.currentlyPlayingType,
            progressMs: parsedJson.player_state.progressMs,
            playingItem: track,
            volume: parsedJson.player_state.volume
        };

        console.log(playerState)

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
}