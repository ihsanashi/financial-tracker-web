import { createLazyFileRoute, redirect } from '@tanstack/react-router'

import { MainContainer } from '@layouts/main-container'

import { supabaseClient } from '@lib/supabase-client'

import { useAuthStore } from '@stores/auth'

import { Button } from '@ui/button'

export const Route = createLazyFileRoute('/(private)/_layout/preferences')({
  component: RouteComponent,
})

function RouteComponent() {
  async function handleSignOut() {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      console.error('Error from Supabase: ', error)
    }

    useAuthStore.getState().clearUser()

    redirect({
      to: '/auth/login',
    })
  }

  return (
    <MainContainer className="p-4">
      <div>Hello "/(private)/_layout/preferences"!</div>

      <Button className="my-4" variant="destructive" onClick={handleSignOut}>
        Sign out
      </Button>
    </MainContainer>
  )
}
