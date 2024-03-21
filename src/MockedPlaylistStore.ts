import {Track} from "./model/Track";
import {Playlist} from "./model/Playlist";

const track: Track = {
    id: "123",
    name: 'water',
    author: {id: "1", name: "nihigo"},
    imageUrl: 'https://i1.sndcdn.com/artworks-1Ec6ifP1jlIu0IPE-tHDNTQ-t500x500.jpg',
    album: {
        id: '123',
        name: 'nihigo. Collection'
    },
    durationMs: 262000,
    context: "sonata:track:123"
};
const track2: Track = {
    id: "1234",
    name: 'I don\'t want to ask your father or anything',
    author: {id: "2", name: "Salvia Palth"},
    imageUrl: 'https://f4.bcbits.com/img/a0663846172_16.jpg',
    album: {
        id: '124',
        name: 'melanchole'
    },
    durationMs: 261000,
    context: "sonata:track:1234"
};

const track4: Track = {
    id: "1236",
    name: 'Yuri Yuri Yara Yara',
    author: {id: "4", name: "Mikami Shiori"},
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/YuruYuri_vol_1.jpg/220px-YuruYuri_vol_1.jpg',
    album: {
        id: '126',
        name: 'Yuru yuri OST'
    },
    durationMs: 230000,
    context: "sonata:track:1236"
};


const playlist: Playlist = {
    id: "1",
    name: "Code Geass OST",
    description: "Best songs from Code Geass",
    image: "https://i1.sndcdn.com/artworks-vBv5Vm09cIor-0-t500x500.jpg",
    tracks: [
        track, track2,
    ],
    context: "sonata:playlist:1"
}
const playlist2: Playlist = {
    id: "2",
    name: "Lofi Chill",
    description: "Lofi to chill to",
    image: "https://pbs.twimg.com/media/GAh7k7_WsAA5Dgi?format=jpg&name=900x900",
    tracks: [
        track
    ],
    context: "sonata:playlist:2"
}

const playlists = new Map([
    [playlist.id, playlist],
    [playlist2.id, playlist2]
]) 


export function addPlaylist(playlist: Playlist): void {
    playlists.set(playlist.id, playlist)
}

export function getPlaylist(id: string): Playlist | undefined {
    return playlists.get(id)
}

export function getPlaylists(): Playlist[] {
    return Array.from(playlists.values());
}

export function addToPlaylist(playlistId: string, track: Track): void {
    const found = playlists.get(playlistId);
    console.log("add" + playlistId)
    if (found) {
        found.tracks.push(track)
        console.log(found)
    }
}
