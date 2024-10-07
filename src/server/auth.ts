import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth';
import AzureADProvider, { AzureADProfile } from 'next-auth/providers/azure-ad';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '~/env.mjs';
import { prisma } from '~/server/db';
import { DefaultJWT, JWT } from 'next-auth/jwt';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isOnboardingComplete: boolean;
      phone: string;
      department: string;
      role: string;
      startDate: Date | undefined;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface Profile extends AzureADProfile {
  //   roles: string[];
  // }
  // interface User {
  //   isOnboardingComplete: boolean;
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId: string;
    isOnboardingComplete: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, profile, user }) {
      console.log('jwt', token, profile, user);
      const currentUser = await prisma.user.findUnique({
        where: { email: token.email || '' },
      });
      token.isOnboardingComplete = currentUser?.isOnboardingComplete || false;

      if (user) {
        //Connect the user table to the employee by setting the userId on the employee
        const employee = await prisma.employee.update({
          where: { email: user.email || '' },
          data: { userId: user.id },
        });

        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //Get employee info from the database
        const employee = await prisma.employee.findUnique({
          where: { email: session.user.email || '' },
          include: {
            department: true,
            roles: {
              include: {
                role: true,
              },
            },
          },
        });
        console.log('employee', employee);

        session.user.id = token.userId;
        session.user.isOnboardingComplete = token.isOnboardingComplete;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phone = employee?.phone || '';
        session.user.department = employee?.department?.name || '';
        session.user.role = employee?.roles[0]?.role.roleName || '';
        session.user.startDate = employee?.roles[0]?.startDate || undefined;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    async signIn({ user }) {
      console.log('signIn', user);
      // Check if an employee record exists for this user
      const employee = await prisma.employee.findUnique({
        where: { email: user.email || '' },
        include: { roles: true },
      });

      // if (employee) {
      //   // Check if the employee has any roles to determine if they have completed onboarding
      //   if (employee.roles.length === 0) {
      //     console.log('employee exists but has no roles');
      //     return '/onboarding';
      //   }
      //   return true; // Employee exists and has roles
      // }

      // If no employee record exists, create one
      if (!employee) {
        console.log('employee does not exist');
        await prisma.employee.create({
          data: {
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ')[1] || '',
            email: user.email || '',
            phone: '',
            isActive: true,
          },
        });
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID,
    }),
  ],

  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
