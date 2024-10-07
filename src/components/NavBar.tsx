import React from 'react';
import { Button } from './ui/button';
import { LogInIcon, MountainIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '~/utils/api';

type Props = {};

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="space-y-4">
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
}

const NavBar = (props: Props) => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  const isLoggedIn = sessionData !== null;
  return (
    <div className="flex h-16 items-center justify-between border-b px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Acme Inc</span>
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Button onClick={() => void signOut()}>Sign Out</Button>
        ) : (
          <Button
            onClick={() =>
              void signIn('credentials', {
                callbackUrl: '/onboarding',
                redirect: true,
              })
            }
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
