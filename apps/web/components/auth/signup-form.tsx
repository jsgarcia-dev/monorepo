'use client';

import { AuthForm } from './auth-form';
import { CardWrapper } from './card-wrapper';
import { registerSchema } from '@/schemas';
import { Mail, Lock, User } from 'lucide-react';
import { FormData } from '@/schemas';
import { register } from '@/_actions/auth/register';
import { useTransition } from 'react';

const registerFields = [
  {
    name: 'name' as const,
    label: 'Name',
    type: 'text',
    placeholder: 'John Doe',
    icon: <User className="h-4 w-4" />,
  },
  {
    name: 'email' as const,
    label: 'Email',
    type: 'email',
    placeholder: 'john.doe@example.com',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    name: 'password' as const,
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    icon: <Lock className="h-4 w-4" />,
  },
];

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await register(data);
      console.log('REGISTER RESULT:', result);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      headerDescription="Enter your details to create your account"
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/auth/sign-in"
      showSocial={false}
    >
      <AuthForm
        fields={registerFields}
        onSubmit={onSubmit}
        schema={registerSchema}
        isPending={isPending}
        buttonText="Create account"
      />
    </CardWrapper>
  );
};
