import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(public)/_layout/auth/welcome')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/_layout/auth/welcome"!</div>;
}
