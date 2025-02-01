'use client';

import { AuthForm } from './auth-form';
import { CardWrapper } from './card-wrapper';
import { loginSchema, LoginFormData } from '@/schemas';
import { Mail, Lock } from 'lucide-react';

type Field = {
  name: 'email' | 'password';
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  showForgotPassword?: boolean;
};

const loginFields: Field[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'john.doe@example.com',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    showForgotPassword: true,
    icon: <Lock className="h-4 w-4" />,
  },
];

export const SignInForm = () => {
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      headerDescription="Enter your email and password to sign in to your account"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/sign-up"
      showSocial={true}
    >
      <AuthForm fields={loginFields} onSubmit={onSubmit} schema={loginSchema} buttonText="Entrar" />
    </CardWrapper>
  );
};
