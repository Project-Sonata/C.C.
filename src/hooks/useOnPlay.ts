import {Track} from "../model/Track";
import useQueue, {Queue} from "./useQueue";
import usePlayer, {PlayerStore} from "./usePlayer";


function doOnPlay(player: PlayerStore, track: Track, queue: Queue, tracks: Track[]) {
    player.setId(track.id)
    player.setCurrentTrack(track)
    player.setIsActive(true)
    queue.clear()
    queue.setCurrentTrack(track)
    const index = tracks.indexOf(track);

    tracks.slice(index).forEach(t => queue.add(t))
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
        if (player.context === context && queue.currentTrack?.id === track.id) {
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