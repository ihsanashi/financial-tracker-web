import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Loader, MailCheck, MailWarning } from 'lucide-react';
import { ComponentPropsWithoutRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabaseClient } from '@lib/supabase-client';
import { cn } from '@lib/utils';
import { RegistrationFormValues, registrationSchema } from '@lib/zod-schemas';

import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { PasswordInput } from '@ui/password-input';

export function RegistrationForm({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ error: boolean; title: string; description: string }>();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegistration = async (form: RegistrationFormValues) => {
    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.origin}/${import.meta.env.VITE_SUPABASE_POST_AUTHENTICATION_REDIRECT_PATH}`,
        },
      });

      if (data) {
        console.log('Data: ', data);

        setResult({
          error: false,
          title: 'Almost there!',
          description:
            'Please lookout for an email in your inbox, and click the included link to confirm your account.',
        });
      } else {
        console.error('Error from Supabase', error);

        setResult({
          error: true,
          title: 'Error creating an account',
          description: 'We had trouble creating your user account. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Unexpected error', error);

      setResult({
        error: true,
        title: 'Unexpected error',
        description: "We're not sure what went wrong. Please try again later. Apologies for the technical error.",
      });
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
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your credentials below to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegistration)}>
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
                        <FormDescription>We'll send you an email to confirm your account.</FormDescription>
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="strong-password-keeps-your-account-secure"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We recommend generating a random, strong password with a password manager.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="must-match-password-above"
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
                  Register
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Have an existing account?
                <Link
                  className="ml-1 underline underline-offset-4"
                  to="/auth/login"
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Alert>
          {result.error ? <MailWarning className="h-4 w-4 stroke-red-500" /> : <MailCheck className="h-4 w-4" />}
          <AlertTitle>{result.title}</AlertTitle>
          <AlertDescription>{result.description}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
