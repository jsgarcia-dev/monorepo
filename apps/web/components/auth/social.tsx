'use client';

import GoogleIcon from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';

interface SocialProps {
  className?: string;
}

export const Social = ({ className }: SocialProps) => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" variant="outline" onClick={() => {}} className={cn('w-full', className)}>
        <GoogleIcon className="size-5" />
      </Button>
      <Button size="lg" variant="outline" onClick={() => {}} className={cn('w-full', className)}>
        <Github className="size-5" />
      </Button>
    </div>
  );
};
