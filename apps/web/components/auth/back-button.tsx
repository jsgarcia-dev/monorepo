'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" asChild className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
