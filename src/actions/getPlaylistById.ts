import {Playlist} from "../model/Playlist";


export default async  function getPlaylistById(playlistId: string): Promise<Playlist | null> {
    const response = await fetch("http://localhost:9666/playlist/" + playlistId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer token1",
            "Content-Type": "application/json",
        },
    });

    if (response.status === 204) {
        return null;
    }

     return response.json()
        .then(body => {
            const result = body as Playlist;
            result.tracks = []
            result.image = body.images.images[0].url
            console.log(result)
            return result;
        })
}