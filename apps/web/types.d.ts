import { UserRole } from '@repo/database';
import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

// Extensão para o JWT
declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
  }
}
