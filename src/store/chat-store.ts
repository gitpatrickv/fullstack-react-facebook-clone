import { create } from "zustand";

interface ChatStore {
  isChatMaximize: boolean;
  minimizeChat: () => void;
  maximizeChat: () => void;
  queue: number[];
  addToQueue: (newElement: number) => void;
  removeFromQueue: (element: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isChatMaximize: false,
  queue: [],
  minimizeChat: () => set({ isChatMaximize: false }),
  maximizeChat: () => set({ isChatMaximize: true }),
  addToQueue: (newElement: number) =>
    set((state) => {
      const newQueue = [...state.queue, newElement];
      if (newQueue.length > 3) newQueue.shift();
      return { queue: newQueue };
    }),
  removeFromQueue: (element: number) =>
    set((state) => {
      const newQueue = state.queue.filter((item) => item !== element);
      return { queue: newQueue };
    }),
}));
