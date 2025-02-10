import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/signin-form';

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="bg-muted h-[600px] w-[450px] animate-pulse rounded-lg" />
        </div>
      }
    >
      <div className="flex min-h-screen items-center justify-center">
        <SignInForm />
      </div>
    </Suspense>
  );
}
