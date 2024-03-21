import {PlayableItem, PlayableItemType} from "./PlayableItem";

export class TrackPlayableItem implements PlayableItem {
    id: string;
    uri: string | null;

    constructor(id: string, uri: string | null) {
        this.id = id;
        this.uri = uri;
    }

    getPlayingType(): PlayableItemType {
        return PlayableItemType.TRACK;
    }
}