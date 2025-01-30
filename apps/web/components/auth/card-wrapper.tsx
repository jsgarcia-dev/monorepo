'use client';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { BackButton } from '@/components/auth/back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[450px] shadow">
      <CardHeader>
        <Header label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col gap-y-4">
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex flex-col gap-y-4">
        <BackButton label={backButtonLabel} href={backButtonHref || ''} />
      </CardFooter>
    </Card>
  );
};
