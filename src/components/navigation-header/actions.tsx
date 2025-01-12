import { NavigationCmdk } from './navigation-header-actions/cmdk';
import { NavigationCurrency } from './navigation-header-actions/currency-switcher';
import { NavigationTheme } from './navigation-header-actions/theme-switcher';

export const Actions = () => {
  return (
    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
      <NavigationCmdk />
      <nav className="flex items-center gap-2">
        <NavigationCurrency />
        <NavigationTheme />
      </nav>
    </div>
  );
};
