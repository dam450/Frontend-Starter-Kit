import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/login-form';
import { auth } from '@/lib/auth';

export default async function LoginPage() {
  const session = await auth();

  if (session) return redirect('/admin');
  return (
    <main className="flex h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}
