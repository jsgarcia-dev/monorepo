import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma, UserRole } from '@repo/database';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // TODO FEAT: Implementar a verificação de email no login
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
