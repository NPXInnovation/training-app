import { type NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { api } from '~/utils/api';

// Import new components (to be created)
import Responsibilities from '~/components/Responsibilities';
// import Trainings from '~/components/Trainings';
// import Software from '~/components/Software';
// import Governance from '~/components/Governance';
// import JobAids from '~/components/JobAids';
// import CurrentRole from '~/components/CurrentRole';
import AdminPanel from '~/components/AdminPanel';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const isManager = api.user.isManager.useQuery().data;

  return (
    <>
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
        <Tabs defaultValue="responsibilities">
          <TabsList>
            <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
            <TabsTrigger value="trainings">Trainings</TabsTrigger>
            <TabsTrigger value="software">Required Software</TabsTrigger>
            <TabsTrigger value="governance">
              Governance & Procedures
            </TabsTrigger>
            <TabsTrigger value="jobaids">Job Aids</TabsTrigger>
            <TabsTrigger value="currentrole">Current Role</TabsTrigger>
            {isManager && <TabsTrigger value="admin">Admin</TabsTrigger>}
          </TabsList>
          <TabsContent value="responsibilities">
            <Responsibilities />
          </TabsContent>
          <TabsContent value="trainings">{/* <Trainings /> */}</TabsContent>
          <TabsContent value="software">{/* <Software /> */}</TabsContent>
          <TabsContent value="governance">{/* <Governance /> */}</TabsContent>
          <TabsContent value="jobaids">{/* <JobAids /> */}</TabsContent>
          <TabsContent value="currentrole">{/* <CurrentRole /> */}</TabsContent>
          {isManager && (
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </>
  );
};

export default Home;
