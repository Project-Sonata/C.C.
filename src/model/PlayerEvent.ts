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
interface CurrentPlayerState {
    // Define properties relevant to the player state
}

/**
 * List of the player event types to return to the client
 */
enum EventType {
    PLAYER_STATE_UPDATED,
    QUEUE_STATE_CHANGED,
    NEW_DEVICE_CONNECTED,
    DEVICE_DISAPPEARED,
}
