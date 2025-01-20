import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useState } from 'react';

import { MainContainer } from '@layouts/main-container';

import { supabaseClient } from '@lib/supabase-client';

import { useAuthStore } from '@stores/auth';

import { Button } from '@ui/button';

export const Route = createLazyFileRoute('/(private)/_layout/preferences')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { clearSession } = useAuthStore();

  async function handleSignOut() {
    setLoading(true);

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error('Error from Supabase: ', error);
    }

    clearSession();

    router.navigate({
      to: '/auth/login',
    });

    setLoading(false);
  }

  return (
    <MainContainer className="p-4">
      <div className="text-slate-900 dark:text-slate-100">Hello "/(private)/_layout/preferences"!</div>

      <Button
        className="my-4"
        disabled={loading}
        variant="destructive"
        onClick={handleSignOut}
      >
        {loading && <Loader className="animate-spin" />}
        Sign out
      </Button>
    </MainContainer>
  );
}
