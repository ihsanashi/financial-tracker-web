import { NavigationHeader } from '@/components/navigation-header';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// navigation menu
// left side consists of the pages
// right side consists of the command menu, currency and theme

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationHeader.Root>
        <NavigationHeader.Links />
        <NavigationHeader.Actions />
      </NavigationHeader.Root>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
