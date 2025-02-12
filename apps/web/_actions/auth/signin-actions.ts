'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { userService } from '@/services/users.service';

export type SignInResponse = {
  error?: string;
  success?: string;
};

export async function SigninAuth(
  prevState: SignInResponse | null,
  formData: FormData
): Promise<SignInResponse> {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Credenciais inválidas' };
  }

  const existingUser = await userService.getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email não encontrado' };
  }

  if (existingUser.isOAuthUser) {
    return { error: 'Use o login com Google para esta conta' };
  }

  if (!existingUser.emailVerified) {
    try {
      const response = await fetch('http://localhost:3001/api/verify-email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar email de verificação');
      }

      return { success: 'Email de confirmação reenviado!' };
    } catch {
      return { error: 'Erro ao reenviar email de verificação' };
    }
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });

    if (!result?.error) {
      return { success: 'Login realizado com sucesso!' };
    }

    if (result.error === 'CredentialsSignin') {
      return { error: 'Credenciais inválidas' };
    }

    return { error: 'Ocorreu um erro na autenticação' };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Falha na autenticação' };
    }

    return { error: 'Erro interno do servidor' };
  }
}
