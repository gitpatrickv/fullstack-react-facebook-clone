import { create } from "zustand";

interface StoryStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoryStore = create<StoryStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
