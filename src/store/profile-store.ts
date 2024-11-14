import { create } from "zustand";

interface ProfileStore {
  isProfile: boolean;
  setIsProfile: (value: boolean) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  isProfile: true,
  setIsProfile: (value: boolean) => set({ isProfile: value }),
}));
