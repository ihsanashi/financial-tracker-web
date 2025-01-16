import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: `${import.meta.env.VITE_BASE_LOCAL_STORAGE_KEY}-theme`,
    }
  )
);
