import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
  description?: string;
}

export const Header = ({ label, description }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 {label}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
