import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(public)/_layout/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/about"!</div>
}
