import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const omitSessionKeys: (keyof Session)[] = [
  'provider_token',
  'provider_refresh_token',
  'access_token',
  'refresh_token',
];

type AuthStoreState = {
  session: Partial<Session> | null;
};

type AuthStoreActions = {
  setSession: (session: Partial<Session>) => void;
  clearSession: () => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,

      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: `${import.meta.env.VITE_BASE_LOCAL_STORAGE_KEY}-auth`,
      partialize: (state) => ({
        session: state.session
          ? Object.fromEntries(
              Object.entries(state.session).filter(([key]) => !omitSessionKeys.includes(key as keyof Session))
            )
          : null,
      }),
    }
  )
);
