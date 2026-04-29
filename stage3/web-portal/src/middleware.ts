import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  // If user is at login page and already has a token, redirect to dashboard
  if (request.nextUrl.pathname === '/login') {
    if (accessToken) return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
  }

  // If user is at a protected route and has no token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
