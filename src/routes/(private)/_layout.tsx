import { Outlet, createFileRoute } from '@tanstack/react-router'

import { NavigationHeader } from '@components/navigation-header'

export const Route = createFileRoute('/(private)/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <NavigationHeader.Root>
        <NavigationHeader.Links />
        <NavigationHeader.Actions />
      </NavigationHeader.Root>
      <Outlet />
    </>
  )
}
