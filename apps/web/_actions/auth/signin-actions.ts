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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Invalid credentials' };
  }

  const existingUser = await userService.getUserByEmail(email);

  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: 'Oops! Algo deu errado. Tente novamente mais tarde.' };
  // }

  if (!existingUser) {
    return { error: 'Email não encontrado' };
  }

  // Verifica se é usuário OAuth
  if (existingUser.isOAuthUser) {
    return { error: 'Use o login com Google para esta conta' };
  }

  if (!existingUser.emailVerified) {
    try {
      // Chama a API para reenviar email de verificação
      const response = await fetch('http://localhost:3001/api/verify-email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Login realizado com sucesso!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas' };
        default:
          return { error: 'Ocorreu um erro' };
      }
    }

    throw error;
  }
}
