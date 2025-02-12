'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmailToken } from '@/_actions/auth/verify-email-actions';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Sourcegraph from '../logo';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';

type VerificationStatus = 'loading' | 'success' | 'error';

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('Verificando seu email...');

  const token = searchParams.get('token');

  const verifyToken = useCallback(async () => {
    if (!token) {
      setStatus('error');
      setMessage('Token não encontrado');
      return;
    }

    try {
      const response = await verifyEmailToken(token);

      if (response.error) {
        setStatus('error');
        setMessage(response.error);
        return;
      }

      setStatus('success');
      setMessage(response.message || 'Email verificado com sucesso!');

      // Redireciona após sucesso
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000);
    } catch {
      setStatus('error');
      setMessage('Erro ao verificar email');
    }
  }, [token, router]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 space-y-10">
      <Card className="w-[450px]">
        <CardHeader className="items-center justify-center">
          <Sourcegraph className="mb-2 h-12 w-12" />
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Verificando email'}
            {status === 'success' && 'Email verificado!'}
            {status === 'error' && 'Falha na verificação'}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'loading' && <BeatLoader color="currentColor" size={14} />}
          <Link href="/auth/sign-in">
            <Button className="group mt-4 text-white" variant="ghost">
              <ArrowLeft
                className="opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Voltar para login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
