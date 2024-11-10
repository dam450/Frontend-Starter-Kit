import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default async function UserAvatar({ className }: UserAvatarProps) {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-md border border-solid border-secondary px-4 py-2',
        className
      )}
    >
      <img
        src={session.user.image!}
        alt={String(session.user.name)}
        className="size-12 overflow-hidden rounded-full border border-solid border-secondary"
      />

      <span className="ml-2 font-sans text-foreground">
        {session.user.name}
      </span>
    </div>
  );
}
UserAvatar.displayName = 'UserAvatar';
