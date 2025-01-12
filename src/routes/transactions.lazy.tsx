import { createLazyFileRoute } from '@tanstack/react-router';

import { MainContainer } from '@layouts/main-container';

export const Route = createLazyFileRoute('/transactions')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainContainer className="p-4">
      <div>Hello "/transactions"!</div>
    </MainContainer>
  );
}
