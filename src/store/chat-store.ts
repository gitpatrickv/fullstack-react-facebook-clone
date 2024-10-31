import { create } from "zustand";

interface ChatStore {
  isChatMinimized: boolean;
  minimizeChat: () => void;
  maximizeChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isChatMinimized: false,
  minimizeChat: () => set({ isChatMinimized: false }),
  maximizeChat: () => set({ isChatMinimized: true }),
}));
