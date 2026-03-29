import { create } from 'zustand';

export interface AudioTrack {
  id: string;
  title: string;
  url: string;
  bookTitle?: string;
  duration?: string;
}

interface AudioState {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  volume: number;
  setTrack: (track: AudioTrack) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  stop: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
  stop: () => set({ currentTrack: null, isPlaying: false }),
}));
