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

const Analytics: NextPage = () => {
  const { data: sessionData } = useSession();
  // const isManager = api.user.isManager.useQuery().data;

  return (
    <div className="flex justify-between">
      <CollapsibleNavbar />
      <Head>
        <title>Employee Dashboard</title>
        <meta
          name="description"
          content="Employee information and resources"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="container mx-auto px-4">
        <h1 className="mb-6 text-4xl font-bold">Employee Dashboard</h1>
        <AuthShowcase />
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="software-hardware">
              Software/Hardware
            </TabsTrigger>
            <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
            <TabsTrigger value="job-aids">Job Aids</TabsTrigger>
            <TabsTrigger value="governance-procedures">
              Governance & Procedures
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="tbd"
            >
              etc...
            </TabsTrigger>
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

export default Analytics;

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
