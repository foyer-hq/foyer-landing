import { create } from 'zustand';

export interface FoyerStore {
  scrollProgress: number; // Normalized scroll progress (0 to 1)
  padlockVisible: boolean; // True when the Security section is in the viewport
  setScrollProgress: (progress: number) => void;
  setPadlockVisible: (visible: boolean) => void;
}

export const useFoyerStore = create<FoyerStore>((set) => ({
  scrollProgress: 0,
  padlockVisible: false,
  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),
  setPadlockVisible: (visible) => set({ padlockVisible: visible }),
}));
