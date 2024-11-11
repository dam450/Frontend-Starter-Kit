import { redirect } from 'next/navigation';

import { SignOutButton } from '@/components/signout-button';
import UserAvatar from '@/components/user-avatar';
import { auth } from '@/lib/auth';

export default async function AdminPage() {
  const session = await auth();

  if (!session) return redirect('/login');

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-3xl">Admin</h1>

      <UserAvatar className="mb-4 mt-8" />

      <SignOutButton />
    </main>
  );
}
