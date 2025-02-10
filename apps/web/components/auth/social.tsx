'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

interface SocialProps {
  className?: string;
  isPending: boolean;
}

export const Social = ({ className, isPending }: SocialProps) => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        variant="outline"
        className={cn(
          'w-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800',
          className
        )}
        onClick={() => onClick('google')}
        disabled={isPending}
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972
                    c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814
                    C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10
                    c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        {isPending ? 'Signing in...' : 'Continue with Google'}
      </Button>
    </div>
  );
};
