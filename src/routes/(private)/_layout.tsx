import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { NavigationHeader } from '@components/navigation-header';

export const Route = createFileRoute('/(private)/_layout')({
  component: LayoutComponent,
  beforeLoad: async ({ context, location }) => {
    const { session } = context.auth;

    if (!session) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function LayoutComponent() {
  return (
    <>
      <NavigationHeader.Root>
        <NavigationHeader.Links />
        <NavigationHeader.Actions />
      </NavigationHeader.Root>
      <Outlet />
    </>
  );
}
