import {Track} from "./Track";

export interface Playlist {
    id: string,
    name: string,
    description: string,
    image: string | undefined,
    tracks: Track[]
    context: string,
}