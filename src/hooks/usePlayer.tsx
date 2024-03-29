import { create } from 'zustand'
import {Track} from "../model/Track";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    currentTrack?: Track;
    isActive: boolean;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setCurrentTrack: (track: Track) => void;
    setIsActive: (isActive: boolean) => void;
    reset: () => void;

}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    currentTrack: undefined,
    isActive: false,
    setCurrentTrack: (track: Track) => set({currentTrack: track}),
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    setIsActive: (isActive: boolean) => set({isActive: isActive}),
    reset: () => set({ ids: [], activeId: undefined, currentTrack: undefined })
}));

export default usePlayer;