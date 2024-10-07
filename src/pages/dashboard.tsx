import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/router';
import Profile from '~/components/Profile';
import Responsibilities from '~/components/Responsibilities';
import Training from '~/components/Training';
import SoftwareHardware from '~/components/SoftwareHardware';
import GovernanceProcedures from '~/components/GovernanceProcedures';
import JobAids from '~/components/JobAids';
import { useSession } from 'next-auth/react';

type Props = {};

function Dashboard(props: Props) {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className="space-y-8 pt-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Employee Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="software-hardware">Software/Hardware</TabsTrigger>
          <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
          <TabsTrigger value="job-aids">Job Aids</TabsTrigger>
          <TabsTrigger value="governance-procedures">
            Governance & Procedures
          </TabsTrigger>
          <TabsTrigger
            disabled
            value="tbd"
          >
            ETC...
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
    </div>
  );
}

export default Dashboard;
