import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useThemeStore } from '@stores/theme';

import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <RouterProvider router={router} basepath="/financial-tracker-web/" />;
};
