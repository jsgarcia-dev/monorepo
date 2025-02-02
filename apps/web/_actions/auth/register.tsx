'use server';

import { prisma } from '@repo/database';
import { registerSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/data/user';

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
  const hashedPassword = await bcrypt.hash(password, 10);

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

  // TODO: Send verification token email

  console.log('VALIDATED DATA:', validatedFields.data);

  return { success: 'Conta criada com sucesso!' };
}
