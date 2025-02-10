'use client';

import { Link, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import Lottie from 'lottie-react';
import verifyEmailAnimation from '@/components/icons/verifi-email-loader.json';

export const VerifyEmailForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <div className="w-[120px]">
              <Lottie
                animationData={verifyEmailAnimation}
                loop={false} // Não repetir a animação
                autoplay={true} // Iniciar a animação automaticamente
                onComplete={() => {
                  // Callback para quando a animação terminar
                  setIsLoading(false);
                }}
              />
            </div>
            <span
              className={`ml-2 text-3xl font-bold ${isLoading ? 'text-lg text-white' : 'text-green-500'}`}
            >
              {isLoading
                ? 'Aguarde, estamos validando sua confirmação...'
                : 'Email confirmation successful'}
            </span>
          </CardTitle>
          <CardDescription className="text-center font-bold">
            {!isLoading && 'You can now log in.'}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center">
          {!isLoading && (
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
                return to login page
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
