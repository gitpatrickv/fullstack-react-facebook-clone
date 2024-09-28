import { create } from "zustand";

interface UserStore {
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  coverPhoto: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  setUserId: (id: number | null) => void;
  setFirstName: (fName: string | null) => void;
  setLastName: (lName: string | null) => void;
  setProfilePicture: (picture: string | null) => void;
  setCoverPhoto: (photo: string | null) => void;
  setDateOfBirth: (birth: string | null) => void;
  setGender: (g: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  firstName: null,
  lastName: null,
  profilePicture: null,
  coverPhoto: null,
  dateOfBirth: null,
  gender: null,
  setUserId: (id: number | null) => set({ userId: id }),
  setFirstName: (fName: string | null) => set({ firstName: fName }),
  setLastName: (lName: string | null) => set({ lastName: lName }),
  setProfilePicture: (picture: string | null) =>
    set({ profilePicture: picture }),
  setCoverPhoto: (photo: string | null) => set({ coverPhoto: photo }),
  setDateOfBirth: (birth: string | null) => set({ dateOfBirth: birth }),
  setGender: (g: string | null) => set({ gender: g }),
  resetUser: () =>
    set({
      userId: null,
      firstName: null,
      lastName: null,
      profilePicture: null,
      coverPhoto: null,
      dateOfBirth: null,
      gender: null,
    }),
}));
