import { Logo } from '@/components/navigation-header/logo';
import { NavigationTheme } from '@/components/navigation-header/navigation-header-actions';
import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { commonLinkStyle } from '@lib/utils';

export const Route = createFileRoute('/(public)/_layout')({
  component: LayoutComponent,
  beforeLoad: async ({ context }) => {
    const { session } = context.auth;

    if (session) {
      throw redirect({
        to: '/', // redirect to previously accessed route or homepage
      });
    }
  },
});

function LayoutComponent() {
  return (
    <>
      <header className="border-grid sticky top-0 z-50 w-full border-b backdrop-blur dark:border-b-zinc-800 dark:bg-black/95">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-6">
          <Logo to="/" />
          <div className="flex w-full flex-1 items-center justify-between gap-4 text-sm md:justify-end">
            <Link
              className={commonLinkStyle}
              to="/auth/login"
            >
              Login
            </Link>
            <Link
              className={commonLinkStyle}
              to="/auth/register"
            >
              Register
            </Link>
            <Link
              className={commonLinkStyle}
              to="/auth/forgot-password"
            >
              Forgot password
            </Link>
            <NavigationTheme />
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="bg-zinc-50 p-4 text-center">
        <Link
          className="text-sm"
          to="/about"
        >
          About
        </Link>
      </footer>
    </>
  );
}
