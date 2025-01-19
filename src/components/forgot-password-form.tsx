import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { ComponentPropsWithoutRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabaseClient } from '@lib/supabase-client';
import { cn } from '@lib/utils';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@lib/zod-schemas';

import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';

export function ForgotPasswordForm({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (form: ForgotPasswordFormValues) => {
    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(form.email, {
        redirectTo: `${window.origin}/${import.meta.env.VITE_SUPABASE_POST_FORGOT_PASSWORD_REDIRECT_PATH}`,
      });

      if (data) {
        console.log('Data: ', data);
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
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email below, we'll send you a link where you can reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForgotPassword)}>
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
                <Button
                  className="w-full"
                  disabled={loading}
                  type="submit"
                >
                  {loading && <Loader className="animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
