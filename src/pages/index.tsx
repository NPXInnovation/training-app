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

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  // const isManager = api.user.isManager.useQuery().data;

  return (
    <div className="flex items-center justify-center">
      {/* <CollapsibleNavbar /> */}
      <Head>
        <title>eXpert Training App</title>
        <meta
          name="description"
          content="Employee information and resources"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="container mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="p-4 text-4xl font-bold">eXpert</h1>
        {/* <AuthShowcase /> */}
        <Tabs
          defaultValue="profile"
          className="w-full"
        >
          <TabsList className="w-full justify-start">
            {/* <TabsTrigger
              value="profile"
              className="flex-1"
            >
              Profile
            </TabsTrigger> */}
            <TabsTrigger
              value="training"
              className="flex-1"
            >
              Training
            </TabsTrigger>
            <TabsTrigger
              value="software-hardware"
              className="flex-1"
            >
              Software/Hardware
            </TabsTrigger>
            <TabsTrigger
              value="responsibilities"
              className="flex-1"
            >
              Responsibilities
            </TabsTrigger>
            <TabsTrigger
              value="job-aids"
              className="flex-1"
            >
              Job Aids
            </TabsTrigger>
            <TabsTrigger
              value="governance-procedures"
              className="flex-1"
            >
              Governance & Procedures
            </TabsTrigger>
            {/* <TabsTrigger
              disabled
              value="tbd"
              className="flex-1"
            >
              more coming soon!
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="responsibilities">
            <Responsibilities />
          </TabsContent>
          <TabsContent value="training">
            <Training />
          </TabsContent>
          <TabsContent value="software-hardware">
            <SoftwareHardware />
          </TabsContent>
          <TabsContent value="governance-procedures">
            <GovernanceProcedures />
          </TabsContent>
          <TabsContent value="job-aids">
            <JobAids />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;

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
