import {secureFetch} from "./api/secureFetch";
import {SONATA_CONNECT_API} from "./api/config";

export function play(contextUri: string) {

    const body = {
        "context_uri": contextUri
    }

    return Promise.resolve(() => console.log("Send play playback API"))

    // return secureFetch(`${SONATA_CONNECT_API}/v1/player/play`, {
    //     body: JSON.stringify(body),
    //     method: 'PUT'
    // })
}

export function resume(): Promise<any> {
    return Promise.resolve(() => console.log("Send resume playback API"))
    // return secureFetch(`${SONATA_CONNECT_API}/v1/player/play`, {
    //     method: 'PUT'
    // })
}

export function pause() {
    return Promise.resolve(() => console.log("Send resume pause API"))
    // return secureFetch(`${SONATA_CONNECT_API}/v1/player/pause`, {
    //     method: 'PUT'
    // })
}

export function usePlayerOperations() {
    return {play, resume, pause}
}