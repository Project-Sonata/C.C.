import {Author} from "./Author";
import {Album} from "./Album";

export interface Track {
    id: string,
    name: string,
    author: Author,
    imageUrl: string,
    album: Album,
    durationMs: number
}