import { create } from 'zustand'
import {Track} from "../model/Track";
interface PlayerStore {
    ids: string[];
    activeId?: string;
    currentTrack?: Track;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setCurrentTrack: (track: Track) => void;
    reset: () => void;

}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    currentTrack: undefined,
    setCurrentTrack: (track: Track) => set({currentTrack: track}),
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    reset: () => set({ ids: [], activeId: undefined, currentTrack: undefined })
}));

export default usePlayer;