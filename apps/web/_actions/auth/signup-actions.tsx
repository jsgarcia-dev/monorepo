'use server';

import { prisma } from '@repo/database';
import { registerSchema } from '@/schemas';
import bcryptjs from 'bcryptjs';
import { userService } from '@/services/users.service';

export type RegisterResponse = {
  error?: string;
  success?: string;
};

export async function RegisterAuth(
  prevState: RegisterResponse | null,
  formData: FormData
): Promise<RegisterResponse> {
  const validatedFields = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email já está em uso' };
  }

  try {
    // Cria o usuário
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Chama a API para gerar token e enviar email
    const response = await fetch('http://localhost:3001/api/verify-email/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Oops, algo deu errado. Tente novamente mais tarde.');
    }

    return {
      success: 'Conta criada com sucesso, Verifique seu email para ativar sua conta.',
    };
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return { error: 'Erro ao criar conta. Tente novamente.' };
  }
}
