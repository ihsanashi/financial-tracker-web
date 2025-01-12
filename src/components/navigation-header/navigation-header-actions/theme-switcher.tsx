import { Moon, Sun } from 'lucide-react';

import { useThemeStore } from '@stores/theme';

import { Button } from '@ui/button';

export const NavigationTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-md py-2 dark:text-white"
      onClick={toggleTheme}
      variant="ghost"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};
