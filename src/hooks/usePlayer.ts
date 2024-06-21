import { create } from 'zustand'
import {Track} from "../model/Track";

export interface PlayerStore {
    volume: number;
    ids: string[];
    activeId?: string;
    currentTrack?: Track;
    isActive: boolean;
    context?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setCurrentTrack: (track: Track) => void;
    setContext: (context?: string) => void;
    setIsActive: (isActive: boolean) => void;
    setVolume: (volume: number) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    currentTrack: undefined,
    isActive: false,
    context: undefined,
    volume: 50,
    setCurrentTrack: (track: Track) => set({currentTrack: track}),
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids }),
    setIsActive: (isActive: boolean) => set({isActive: isActive}),
    setContext: (context?: string) => set({context: context}),
    setVolume: (volume: number) => set({volume: volume}),
    reset: () => set({ ids: [], activeId: undefined, currentTrack: undefined, isActive: false })
}));

export default usePlayer;