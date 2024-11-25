import { create } from "zustand";
import { StoryResponse } from "../entities/Story";

interface StoryStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeUser: StoryResponse | null;
  setActiveUser: (userStory: StoryResponse | null) => void;
}

export const useStoryStore = create<StoryStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  activeUser: null,
  setActiveUser: (user) => set({ activeUser: user }),
}));
