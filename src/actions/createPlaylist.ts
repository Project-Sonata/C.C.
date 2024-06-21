interface CreatePlaylistInfo {
    name: string
}

export default function createPlaylist(payload: CreatePlaylistInfo) {
    return fetch('http://localhost:9666/playlist', {
        method: "POST",
        headers: {
            "Authorization": "Bearer token1",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: payload.name
        })
    })
}