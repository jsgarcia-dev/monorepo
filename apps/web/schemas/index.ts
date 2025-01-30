import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});
