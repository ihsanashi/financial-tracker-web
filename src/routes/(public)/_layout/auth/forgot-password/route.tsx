import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/_layout/auth/forgot-password')({
  beforeLoad: async ({ context }) => {
    const { user } = context.auth;

    if (user) {
      throw redirect({
        to: '/',
      });
    }
  },
});
