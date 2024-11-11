import { signOut } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface SignOutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export function SignOutButton({
  className,
  ...attributes
}: SignOutButtonProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        className={cn(
          'rounded-md border border-solid border-secondary px-4 py-2 hover:bg-secondary/80',
          className
        )}
        type="submit"
        {...attributes}
      >
        Sign Out
      </button>
    </form>
  );
}
SignOutButton.displayName = 'SignOutButton';
