'use server';

import { prisma } from '@repo/database';
import { registerSchema } from '@/schemas';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';

export type RegisterResponse = {
  error?: string;
  success?: string;
};

export async function RegisterAuth(
  prevState: RegisterResponse | null,
  formData: FormData
): Promise<RegisterResponse> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email já está em uso' };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return {
    success:
      'Conta criada com sucesso, verifique sua caixa de entrada para confirmar seu endereço de e-mail.',
  };
}
