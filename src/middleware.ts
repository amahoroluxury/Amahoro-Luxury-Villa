import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Identify protected routes
  const isAdminPath = pathname.startsWith('/admin');
  const isAdminApiPath = pathname.startsWith('/api/admin');

  if (!isAdminPath && !isAdminApiPath) return NextResponse.next();

  // 2. Allow public-facing auth routes
  const isPublicAuthRoute = pathname === '/admin/login' || pathname === '/api/admin/auth';
  if (isPublicAuthRoute) return NextResponse.next();

  // 3. Verify Authentication
  const adminToken = request.cookies.get('admin_auth_token')?.value;

  const hasValidFormat = adminToken &&
    adminToken.startsWith('amt_') &&
    adminToken.length > 20;

  if (!hasValidFormat) {
    if (isAdminApiPath) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
