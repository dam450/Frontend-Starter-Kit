import { redirect } from 'next/navigation';

import { SignOutButton } from '@/components/signout-button';
import UserAvatar from '@/components/user-avatar';
import { auth } from '@/lib/auth';

export default async function PricingPage() {
  const mode = 'subscription';

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-3xl">Price</h1>
    </main>
  );
}
