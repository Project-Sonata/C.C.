import {Author} from "./Author";
import {Album} from "./Album";
import {PlayableItem, PlayableItemType} from "./PlayableItem";

export interface Track {
    id: string,
    name: string,
    author: Author,
    imageUrl: string,
    album: Album,
    durationMs: number,
    context: string

}