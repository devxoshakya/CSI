import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define constant paths to avoid typos and make maintenance easier
const ROUTES = {
  LOGIN: "/login",
  ONBOARDING: "/on-boarding",
  EVENTS: "/events",
  ROOT: "/",
  HOME: "/home",
  DASHBOARD: "/dashboard"
} as const;

export  async function middleware(req: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = req.nextUrl;

  // Get the JWT token
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Handle root path access
  if (pathname === ROUTES.ROOT) {
    // If user is logged in and onboarded, redirect to events
    if (token?.isOnboarded) {
      return NextResponse.redirect(new URL(ROUTES.EVENTS, req.url));
    }

    if(token?.isOnboarded === false) {
      return NextResponse.redirect(new URL(ROUTES.ONBOARDING, req.url));
    }
    // Otherwise, allow access to root
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    if (pathname !== ROUTES.LOGIN) {
      return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
    }
    return NextResponse.next();
  }

  // User is logged in but not onboarded
  if (!token.isOnboarded) {
    // Allow access to onboarding
    if (pathname === ROUTES.ONBOARDING) {
      return NextResponse.next();
    }
    // Redirect to onboarding for all other routes
    return NextResponse.redirect(new URL(ROUTES.ONBOARDING, req.url));
  }

  // User is logged in and onboarded
  if (token.isOnboarded) {
    // Redirect to events if trying to access login or onboarding
    if (['/login', '/'].includes(pathname)) {
      return NextResponse.redirect(new URL(ROUTES.EVENTS, req.url));
    }
    // Allow access to all other protected routes
    return NextResponse.next();
  }
  // Default: allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/on-boarding',
    '/home',
    '/dashboard',
    // Optionally protect all routes:
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};