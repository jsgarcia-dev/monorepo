import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
});

export const registerSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 4 characters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type FormData = LoginFormData | RegisterFormData;
