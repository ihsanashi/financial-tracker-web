import { createLazyFileRoute } from '@tanstack/react-router'

import { MainContainer } from '@layouts/main-container'

export const Route = createLazyFileRoute('/(private)/_layout/accounts')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MainContainer className="p-4">
      <p className="dark:text-white">Hello "/accounts"!</p>
    </MainContainer>
  )
}
