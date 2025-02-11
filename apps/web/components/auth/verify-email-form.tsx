'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Sourcegraph from '../logo';
import { BeatLoader } from 'react-spinners';

interface EmailVerificationProps {
  name?: string;
  email?: string;
  resendVerification?: () => void;
  logoComponent?: React.ReactNode;
  className?: string;
}

export const VerifyEmailForm = ({ className }: EmailVerificationProps) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-6 space-y-10 ${className || ''}`}
    >
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <Sourcegraph className="mb-2 h-12 w-12" />
          <CardTitle className="text-2xl">Confirming verification</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <BeatLoader color="currentColor" size={14} />
          <Button className="group text-white" variant="ghost">
            <ArrowLeft
              className="opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Back to login
          </Button>
          {/* <Button
            onClick={resendVerification}
            className="mb-4 w-full bg-lime-500 text-sm hover:bg-lime-500/60"
          >
            Resend Verification Email
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};
