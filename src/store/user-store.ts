import { create } from "zustand";

interface UserStore {
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  coverPhoto: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  setFirstName: (fName: string | null) => void;
  setLastName: (lName: string | null) => void;
  setProfilePicture: (picture: string | null) => void;
  setCoverPhoto: (photo: string | null) => void;
  setDateOfBirth: (birth: string | null) => void;
  setGender: (g: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  firstName: null,
  lastName: null,
  profilePicture: null,
  coverPhoto: null,
  dateOfBirth: null,
  gender: null,
  setFirstName: (fName: string | null) => set({ firstName: fName }),
  setLastName: (lName: string | null) => set({ lastName: lName }),
  setProfilePicture: (picture: string | null) =>
    set({ profilePicture: picture }),
  setCoverPhoto: (photo: string | null) => set({ coverPhoto: photo }),
  setDateOfBirth: (birth: string | null) => set({ dateOfBirth: birth }),
  setGender: (g: string | null) => set({ gender: g }),
}));
