import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { ComponentPropsWithoutRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabaseClient } from '@lib/supabase-client';
import { cn } from '@lib/utils';
import { LoginFormValues, loginSchema } from '@lib/zod-schemas';

import { useAuthStore } from '@stores/auth';

import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { PasswordInput } from '@ui/password-input';

export function LoginForm({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (form: LoginFormValues) => {
    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (data) {
        console.log('Data:', data);

        useAuthStore.getState().setSession(data.session);
        useAuthStore.getState().setUser(data.user);

        router.navigate({
          to: '/',
        });
      } else {
        console.error('Error from Supabase', error);
      }
    } catch (error) {
      console.error('Unexpected error: ', error);
    }

    setLoading(false);
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials below to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="me@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            to="/auth/forgot-password"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput
                            placeholder="strong-password-keeps-your-account-secure"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={loading}
                  type="submit"
                >
                  {loading && <Loader className="animate-spin" />}
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don't have an account?
                <Link
                  className="ml-1 underline underline-offset-4"
                  to="/auth/register"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
