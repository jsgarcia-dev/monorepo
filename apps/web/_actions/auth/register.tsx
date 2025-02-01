'use server';

import { FormData, registerSchema } from '@/schemas';

export const register = async (data: FormData) => {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, email, password } = validatedFields.data;

  console.log('VALIDATED DATA:', {
    name,
    email,
    password,
  });

  return { success: true };
};
