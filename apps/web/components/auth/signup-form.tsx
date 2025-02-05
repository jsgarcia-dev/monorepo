'use client';

import { cn } from '@/lib/utils';
import { useActionState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Sourcegraph from '../logo';
import { Mail, Lock, User } from 'lucide-react';
import { RegisterAuth } from '@/_actions/auth/signup-actions';
import FormError from './form-error';
import FormSuccess from './form-success';
import { useRouter } from 'next/navigation';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(RegisterAuth, null);

  useEffect(() => {
    if (formState?.success) {
      const timeout = setTimeout(() => {
        router.push('/auth/sign-in');
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [formState?.success, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <Sourcegraph className="h-12 w-12" />
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription>Preencha os dados abaixo para se registrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input id="name" name="name" placeholder="Seu nome completo" className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@exemplo.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    className="pl-10"
                  />
                </div>
              </div>
              {formState?.success && <FormSuccess message={formState.success} />}
              {formState?.error && <FormError message={formState.error} />}
              <Button
                type="submit"
                className="custom:bg-lime-500/80 custom:text-white custom:font-medium custom:hover:bg-lime-500/40 w-full text-sm"
              >
                {isPending ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </div>
            <div className="mt-5 text-center text-sm">
              Já tem uma conta?{' '}
              <Link
                href="/auth/sign-in"
                className="custom:text-lime-500 underline underline-offset-4"
              >
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
