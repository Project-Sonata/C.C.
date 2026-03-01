import {Track} from "../model/Track";
import useQueue, {Queue} from "./useQueue";
import usePlayer, {PlayerStore} from "./usePlayer";


function doOnPlay(player: PlayerStore, track: Track, queue: Queue, tracks: Track[]) {
    player.setId(track.id)
    player.setCurrentTrack(track)
    player.setIsActive(true)
    queue.clear()
    queue.setCurrentTrack(track)
    const index = tracks.findIndex(t => t.id === track.id);
    const tracksToQueue = index === -1 ? tracks : tracks.slice(index);

    tracksToQueue.forEach(t => queue.add(t))
}

const useOnPlay = (tracks: Track[], context?: string) => {
    const player = usePlayer()
    const queue = useQueue()

    const onPlay = (track?: Track) => {
        console.log("current track: " + track?.context)
        console.log("set to context: " + context)
        console.log("current context: " + player.context)
        if (!track) {
            player.setIsActive(true)
            if (!player.currentTrack) {
                doOnPlay(player, tracks[0], queue, tracks);

                if (context) {
                    player.setContext(context)
                }
            }

            return;
        }
        if (queue.currentTrack?.id === track.id && (context === undefined || player.context === context)) {
            player.setIsActive(true)
            return;
        }

        if (context) {
            player.setContext(context)
        }
        doOnPlay(player, track, queue, tracks);
    }

    return onPlay;
}

export default useOnPlay;