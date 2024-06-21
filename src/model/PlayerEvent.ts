import {Devices} from "./Devices";
import {PlayableItem} from "./PlayableItem";
import {Track} from "./Track";

/**
 * Abstract event that received when player is updated
 */
export interface PlayerEvent {

    getCurrentPlayerState(): CurrentPlayerState;

    getEventType(): EventType;

    getDeviceThatChanged(): string;
}

/**
 * Represents the current player state.
 */
export interface CurrentPlayerState {
    isPlaying: boolean; // Indicates if player plays something
    repeatState: RepeatState; // Repeat state
    shuffleState: boolean; // Shuffle state
    currentlyPlayingType: string; // Type of currently playing item
    progressMs: number; // Progress in milliseconds
    devices: Devices; // Devices information
    playingItem: PlayableItem; // Currently playing item
    volume: number,
}

export enum RepeatState {
    OFF,
    TRACK,
    CONTEXT
}

/**
 * List of the player event types to return to the client
 */
export enum EventType {
    PLAYER_STATE_UPDATED,
    QUEUE_STATE_CHANGED,
    NEW_DEVICE_CONNECTED,
    DEVICE_DISAPPEARED,
}
