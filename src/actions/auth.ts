'use server';

import { signIn, signOut } from '@/lib/auth';

export const doCredentialsSignIn = async (formData: FormData) => {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    return response;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const doSignOut = async () => {
  await signOut();
};
