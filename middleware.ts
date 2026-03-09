import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ------------------------------------------------------------------
  // 1. THE MVP SHORTCUT (The /demo redirect)
  // If a judge types in the /demo URL, route them instantly to the student dashboard
  // ------------------------------------------------------------------
  if (pathname === '/demo') {
    return NextResponse.redirect(new URL('/student', request.url));
  }

  // ------------------------------------------------------------------
  // 2. FUTURE-PROOFING: AUTHENTICATION BARRIER
  // Uncomment this block post-hackathon when you connect Supabase Auth or NextAuth.
  // This prevents unauthenticated users from seeing the dashboards.
  // ------------------------------------------------------------------
  /*
  const sessionToken = request.cookies.get('auth_token');
  const isProtectedRoute = pathname.startsWith('/student') || pathname.startsWith('/teacher');

  if (isProtectedRoute && !sessionToken) {
    // Redirect unauthenticated users to the frictionless login screen
    return NextResponse.redirect(new URL('/login', request.url));
  }
  */

  // Allow all other requests to proceed normally
  return NextResponse.next();
}

// ------------------------------------------------------------------
// 3. MATCHER CONFIGURATION
// This tells Next.js exactly which routes to run this middleware on.
// We aggressively exclude static assets and API routes to maximize speed.
// ------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - we secure these individually)
     * - _next/static (static files like CSS/JS)
     * - _next/image (image optimization files)
     * - favicon.ico, images, svgs (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};