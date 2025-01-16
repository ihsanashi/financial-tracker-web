import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      session: null,
      user: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ session: null, user: null }),
    }),
    {
      name: `${import.meta.env.VITE_BASE_LOCAL_STORAGE_KEY}-auth`,
    }
  )
);
