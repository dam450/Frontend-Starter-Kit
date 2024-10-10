import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmail } from '@/data';

import { authConfig } from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      address: string;
    } & DefaultSession['user'];
  }
  interface User {
    role?: string;
  }
}

const config: NextAuthConfig = {
  ...authConfig,

  providers: [
    Credentials({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'e-mail',
          type: 'email',
          placeholder: 'e-mail',
          required: true,
        },
        password: {
          label: 'senha',
          type: 'password',
          placeholder: 'senha',
          required: true,
        },
      },

      authorize: async (credentials) => {
        try {
          const user = await getUserByEmail(credentials?.email as string);

          if (user) {
            const isValidUser = user.password === credentials?.password;

            if (isValidUser) {
              return user;
            } else {
              throw new Error('Invalid credentials');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.error(error);

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 0,
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = String(token.id);
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
