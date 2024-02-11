import {Author} from "./Author";

export interface Track {
    id: string,
    name: string,
    author: Author,
    imageUrl: string
}