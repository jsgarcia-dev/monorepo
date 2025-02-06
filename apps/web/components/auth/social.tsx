'use client';

import { signIn } from 'next-auth/react';
import GoogleIcon from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

interface SocialProps {
  className?: string;
}

export const Social = ({ className }: SocialProps) => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => onClick('google')}
        className={cn('w-full border-lime-500/20', className)}
      >
        <GoogleIcon className="size-5" />
        Signin with google
      </Button>
    </div>
  );
};
