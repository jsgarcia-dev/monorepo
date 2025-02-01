import Link from 'next/link';
import { Social } from '@/components/auth/social';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/card';
import Sourcegraph from '../logo';

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
    <Card className="w-[450px] shadow-sm">
      <CardHeader className="flex items-center justify-center">
        <Sourcegraph className="size-12" />
        <CardTitle className="text-2xl">{headerLabel}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      <CardContent className="mt-4 grid gap-4">{children}</CardContent>

      <CardFooter className="flex flex-col gap-y-4">
        {showSocial && (
          <>
            <div className="relative w-full px-6">
              <div className="flex items-center gap-x-2">
                <div className="border-muted-foreground flex-1 border-t" />
                <span className="text-muted-foreground text-xs uppercase">Or continue with</span>
                <div className="border-muted-foreground flex-1 border-t" />
              </div>
            </div>
            <Social />
          </>
        )}

        <Button variant="link" size="sm" className="w-full font-normal" asChild>
          <Link href={backButtonHref || ''}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
