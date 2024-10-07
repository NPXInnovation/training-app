import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { api } from '~/utils/api';
import CollapsibleNavbar from '~/components/CollapsibleNav';

import Responsibilities from '~/components/Responsibilities';
import { Button } from '~/components/ui/button';
import Training from '~/components/Training';
import SoftwareHardware from '~/components/SoftwareHardware';
import GovernanceProcedures from '~/components/GovernanceProcedures';
import JobAids from '~/components/JobAids';
import Profile from '~/components/Profile';

const Help: NextPage = () => {
  const { data: sessionData } = useSession();
  // const isManager = api.user.isManager.useQuery().data;

  return (
    <div className="flex justify-between">
      <CollapsibleNavbar />
      <h1>oh god help</h1>
    </div>
  );
};

export default Help;

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
