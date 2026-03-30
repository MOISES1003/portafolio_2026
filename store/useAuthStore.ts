import { IUser } from "@/features/auth/auth.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    user: IUser | null;
    setUser: (user: IUser, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);