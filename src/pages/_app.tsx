/* eslint-disable */
// @ts-nocheck
// disbale eslint for this file

import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Toaster } from 'sonner';
import { api } from '~/utils/api';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';

type MyAppProps = AppType<{ session: Session | null }>;

const MyApp: MyAppProps = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Employee Dashboard</title>
        <meta
          name="description"
          content="Employee information and resources"
          key="description"
        />
      </Head>
      <SessionProvider session={session}>
        <main className="container mx-auto px-4">
          <Component {...pageProps} />
          <Toaster />
        </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
