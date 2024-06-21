import {Author} from "./Author";
import {Album} from "./Album";

export interface PlayableItem {
    id: string; // ID of the track, episode, podcast, etc
    uri: string | null; // Always null since Sonata does not support it yet.

    getPlayingType(): PlayableItemType;
}

export class TrackPlayableItem implements PlayableItem {
    id: string;
    uri: string | null;
    name: string;
    author: Author;
    imageUrl: string;
    album: Album;
    durationMs: number;
    context: string;

    constructor(id: string, uri: string | null, name: string, author: Author, imageUrl: string, album: Album, durationMs: number, context: string) {
        this.id = id;
        this.uri = uri;
        this.name = name;
        this.author = author;
        this.imageUrl = imageUrl;
        this.album = album;
        this.durationMs = durationMs;
        this.context = context;
    }

    getPlayingType(): PlayableItemType {
        return PlayableItemType.TRACK;
    }
}

export enum PlayableItemType {
    TRACK
}