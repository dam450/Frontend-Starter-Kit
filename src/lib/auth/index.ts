import NextAuth, { NextAuthConfig } from 'next-auth';

import { authConfig } from './auth.config';

const config: NextAuthConfig = {
  ...authConfig,

  pages: {
    signIn: '/login',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
