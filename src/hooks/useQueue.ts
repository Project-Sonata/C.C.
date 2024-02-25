import {Track} from "../model/Track";
import {create} from "zustand";

export interface Queue {
    tracks: Track[],
    currentIndex: number,
    currentTrack?: Track | null,
    setCurrentTrack: (track: Track) => void,
    setCurrentIndex: (index: number) => void,
    clear: () => void,
    next: () => Track | null,
    nextTracks: () => Track[],
    add: (track: Track) => void,
    remove: (trackId: string) => void
}

const useQueue = create<Queue>((set, get) => ({
    tracks: [],
    currentTrack: null,
    currentIndex: 0,
    add: (track) => set((state) => {
            const tracks = [...state.tracks]
            tracks.push(track)
        console.log("added track")
        console.log(tracks)
            return {tracks};
        }
    ),
    setCurrentIndex: (index) => set({currentIndex: index}),
    setCurrentTrack: (track) => set({currentTrack: track}),
    remove: (trackId) => set(state => state),
    clear: () => set({tracks: [], currentTrack: undefined, currentIndex: 0}),
    next: () => {
        const nextIndex = get().currentIndex + 1
        if (nextIndex >= get().tracks.length) {
            return null
        }
        const nextTrack = get().tracks[nextIndex]
        get().setCurrentTrack(nextTrack)
        get().setCurrentIndex(nextIndex)
        return nextTrack;
    },
    nextTracks: () => {
        const currentIndex = get().currentIndex
        console.log('current index: ' + currentIndex)
        console.log(get().tracks.slice(currentIndex + 1))
        return get().tracks.slice(currentIndex + 1)
    }
}));

export default useQueue;
