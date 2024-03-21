export interface PlayableItem {
    id: string; // ID of the track, episode, podcast, etc
    uri: string | null; // Always null since Sonata does not support it yet.

    getPlayingType(): PlayableItemType;
}

export enum PlayableItemType {
    TRACK
}