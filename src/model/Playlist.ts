import {Track} from "./Track";

export interface Playlist {
    id: string,
    name: string,
    description: string,
    image: string,
    tracks: Track[]
    context: string,
}