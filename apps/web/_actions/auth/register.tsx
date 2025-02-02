'use server';

import { registerSchema } from '@/schemas';

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

  console.log('VALIDATED DATA:', validatedFields.data);

  return { success: 'Conta criada com sucesso!' };
}
