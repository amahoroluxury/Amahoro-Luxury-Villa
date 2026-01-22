import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Simple token-based auth for MVP
// In production, use proper JWT or next-auth

const ADMIN_TOKEN_NAME = 'admin_auth_token';
const TOKEN_EXPIRY_HOURS = 24;

function generateToken(): string {
  return `amt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check against Admin table
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // For MVP: also allow hardcoded fallback if no admin in DB
    const isValidFallback = 
      email === 'admin@amahoroluxury.com' && 
      password === 'Amahoro2026!';

    // Compare password (in production, use bcrypt)
    // For now, we store plain text in DB or use fallback
    const isValidAdmin = admin?.password === password || isValidFallback;

    if (!isValidAdmin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate auth token
    const token = generateToken();
    
    // Set secure HTTP-only cookie
    cookies().set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * TOKEN_EXPIRY_HOURS,
      path: '/',
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      redirect: '/admin/bookings'
    });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout - clear the cookie
  cookies().delete(ADMIN_TOKEN_NAME);
  return NextResponse.json({ success: true, message: 'Logged out' });
}

export async function GET() {
  // Check if logged in
  const token = cookies().get(ADMIN_TOKEN_NAME);
  return NextResponse.json({ 
    authenticated: !!token?.value 
  });
}
