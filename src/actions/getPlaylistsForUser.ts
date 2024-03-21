import {Track} from "../model/Track";
import {Playlist} from "../model/Playlist";
import {getPlaylist, getPlaylists} from "../MockedPlaylistStore";


export function getPlaylistsForUser(userId: string): Promise<Playlist[]> {
    const playlists  = getPlaylists()
    return Promise.all(playlists)
}
