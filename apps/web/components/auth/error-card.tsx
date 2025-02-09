import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import Link from 'next/link';

export default function ErrorCard() {
  return (
    <div>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl">
            <TriangleAlert size={44} className="text-red-500" />
            <span className="ml-2">Oops! Something went wrong.</span>
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;re working on it and we&apos;ll get it fixed as soon as we can.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center">
          <Link href="/auth/sign-in">
            <Button
              className="group flex items-center text-sm text-red-500 hover:text-red-500"
              variant="ghost"
            >
              <ArrowLeft
                className="text-red-500 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Voltar para login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
