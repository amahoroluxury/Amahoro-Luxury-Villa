import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if not an admin route
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for admin auth cookie
  const adminToken = request.cookies.get('admin_auth_token');

  // Basic validation of token format (amt_... and length)
  const isValidToken = adminToken?.value && 
                     adminToken.value.startsWith('amt_') && 
                     adminToken.value.length > 20;

  if (!isValidToken) {
    // Redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
