import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(private)/_layout/preferences')({
  beforeLoad: async ({ context, location }) => {
    const { user } = context.auth;

    if (!user) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
