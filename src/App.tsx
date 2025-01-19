import { router } from '@/router';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAuthStore } from '@stores/auth';
import { useThemeStore } from '@stores/theme';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <RouterProvider
      router={router}
      context={{ auth: { user } }}
    />
  );
};
