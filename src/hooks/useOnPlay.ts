import {Track} from "../model/Track";
import useQueue from "./useQueue";
import usePlayer from "./usePlayer";


const useOnPlay = (track: Track) => {
    const player = usePlayer()
    const queue = useQueue()

    const onPlay = () => {
        player.setId(track.id)
        player.setCurrentTrack(track)
        player.setIsActive(true)
        queue.clear()
        queue.setCurrentTrack(track)
        queue.add(track)
    }

    return onPlay;
}

export default useOnPlay;