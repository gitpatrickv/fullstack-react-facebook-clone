import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    jwtToken: string;
    role: string;
    authUser: string;
}

interface AuthQueryStore {
    authStore: AuthStore;
    setJwtToken: (jwtToken: string) => void;
    setRole: (role: string) => void;
    setAuthUser: (authUser: string) => void;
    logout: (navigate: (path: string) => void) => void;
}

export const useAuthQueryStore = create<AuthQueryStore>()(
    persist(
        (set) => ({
            authStore: {
                jwtToken: localStorage.getItem("jwtToken") || "",
                role: localStorage.getItem("role") || "",
                authUser: localStorage.getItem("authUser") || "",
            },
            setJwtToken: (jwtToken) => {
                localStorage.setItem("jwtToken", jwtToken);
                set((state) => ({ authStore: { ...state.authStore, jwtToken } }));
            },
            setRole: (role) => {
                localStorage.setItem("role", role);
                set((state) => ({ authStore: { ...state.authStore, role } }));
            },
            setAuthUser: (authUser) => {
                localStorage.setItem("authUser", authUser);
                set((state) => ({ authStore: { ...state.authStore, authUser } }));
            },
            logout: (navigate) => {
                localStorage.removeItem("jwtToken");
                set((state) => ({ authStore: { ...state.authStore, jwtToken: "" } }));
                localStorage.removeItem("role");
                set((state) => ({ authStore: { ...state.authStore, role: "" } }));
                localStorage.removeItem("authUser");
                set((state) => ({ authStore: { ...state.authStore, authUser: "" } }));
                navigate("/");
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage) 
        }
    )
);
