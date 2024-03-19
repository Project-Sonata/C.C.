import {Track} from "../model/Track";
import useQueue from "./useQueue";
import usePlayer from "./usePlayer";


const useOnPlay = (tracks: Track[], context?: string) => {
    const player = usePlayer()
    const queue = useQueue()

    const onPlay = (track?: Track) => {
        if (!track) {
            player.setIsActive(true)
            return;
        }
        if (queue.currentTrack?.id === track.id) {
            player.setIsActive(true)
            return;
        }

        if (context) {
            player.setContext(context)
        }

        player.setId(track.id)
        player.setCurrentTrack(track)
        player.setIsActive(true)
        queue.clear()
        queue.setCurrentTrack(track)
        const index = tracks.indexOf(track);

        tracks.slice(index).forEach(t => queue.add(t))
    }

    return onPlay;
}

export default useOnPlay;