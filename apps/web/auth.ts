import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma, UserRole } from '@repo/database';
import authConfig from '@/auth.config';
import { userService } from './services/users.service';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      if (user.id === undefined) return false;

      const existingUser = await userService.getUserById(user.id);

      // Prevent users from signing in if their email is not verified
      if (!existingUser?.emailVerified) return false;

      // TODO ADD: add 2FA check

      return true;
    },

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
      const existingUser = await userService.getUserById(token.sub);
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
