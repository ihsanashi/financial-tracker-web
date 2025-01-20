import { MainContainer } from '@/layouts';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(private)/_layout/accounts')({
  component: RouteComponent,
});

function RouteComponent() {
  console.log('hello');
  return (
    <MainContainer className="p-4">
      <div>Hello "/(private)/_layout/accounts"!</div>
    </MainContainer>
  );
}
