import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      session: null,
      user: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ session: null, user: null }),
    }),
    {
      name: 'user',
    }
  )
);
