import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const token = await getToken({ req });
    console.log('token', token);

    // Allow access to the root path and API routes without authentication
    if (url.pathname === '/' || url.pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    //If Logged in
    if (token) {
      //And not onboarded and not on onboarding page
      if (!token.isOnboardingComplete && url.pathname !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
      //If onboarded and on onboarding page
      else if (token.isOnboardingComplete && url.pathname === '/onboarding') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // If not logged in, only allow access to root
    if (!token) {
      if (url.pathname !== '/') {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // If logged in and onboarded, allow access to all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to root path and API routes without token
        if (
          req.nextUrl.pathname === '/' ||
          req.nextUrl.pathname.startsWith('/api/')
        )
          return true;
        // Require token for all other routes
        return !!token;
      },
    },
  }
);
