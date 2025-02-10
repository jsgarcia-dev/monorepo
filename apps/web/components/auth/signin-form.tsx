'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Social } from './social';
import Sourcegraph from '../logo';
import { Separator } from '../ui/separator';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';
import { SigninAuth } from '@/_actions/auth/signin-actions';
import FormError from './form-error';
import FormSuccess from './form-success';
import { useSearchParams } from 'next/navigation';

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const searchParams = useSearchParams();
  const urlError =
    searchParams?.get?.('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';
  const [formState, formAction, isPending] = useActionState(SigninAuth, null);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <Sourcegraph className="h-12 w-12" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="********"
                  />
                </div>
              </div>
              {(formState?.error || urlError) && (
                <FormError message={formState?.error || urlError} />
              )}
              {formState?.success && <FormSuccess message={formState.success} />}
              <Button
                type="submit"
                className="custom:text-white custom:font-medium w-full bg-lime-500 text-sm hover:bg-lime-500/60"
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>
              <div className="-mb-3 flex items-center justify-center overflow-hidden">
                <Separator className="bg-muted-foreground my-4" />
                <span className="px-2 text-sm text-nowrap">Or continue with</span>
                <Separator className="bg-muted-foreground my-4" />
              </div>
              <Social isPending={isPending} />
            </div>
            <div className="mt-5 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/sign-up" className="text-lime-500 underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
