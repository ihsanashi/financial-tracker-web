import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(public)/_layout/auth/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/_layout/auth/reset-password"!</div>;
}
