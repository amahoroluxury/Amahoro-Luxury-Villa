import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath = pathname.startsWith('/admin');
  const isAdminApiPath = pathname.startsWith('/api/admin');

  if (!isAdminPath && !isAdminApiPath) {
    return NextResponse.next();
  }

  // Allow access to login and auth API
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next();
  }

  // Check for admin auth cookie
  const adminToken = request.cookies.get('admin_auth_token');

  // Basic validation of token format (amt_... and length)
  const isValidToken = adminToken?.value &&
    adminToken.value.startsWith('amt_') &&
    adminToken.value.length > 20;

  if (!isValidToken) {
    // If it's an API request, return 401 instead of redirecting
    if (isAdminApiPath) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Redirect dashboard requests to login
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
