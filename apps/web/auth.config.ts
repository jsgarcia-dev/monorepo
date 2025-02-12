import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { loginSchema } from '@/schemas';
import { userService } from './services/users.service';

type UserWithoutPassword = Omit<Awaited<ReturnType<typeof userService.getUserByEmail>>, 'password'>;

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await userService.getUserByEmail(email);

          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Retornamos diretamente o objeto sem o campo password
            return Object.fromEntries(
              Object.entries(user).filter(([key]) => key !== 'password')
            ) as UserWithoutPassword;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
