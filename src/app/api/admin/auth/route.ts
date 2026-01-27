import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const ADMIN_TOKEN_NAME = 'admin_auth_token';
const TOKEN_EXPIRY_HOURS = 24;

// Simple in-memory rate limiter for login
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes

function generateSecureToken(): string {
  return `amt_${crypto.randomBytes(32).toString('hex')}`;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const attempts = loginAttempts.get(ip);

    if (attempts && attempts.count >= MAX_ATTEMPTS && now - attempts.lastAttempt < COOLDOWN_MS) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
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

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare hashed password
    const isValidAdmin = await bcrypt.compare(password, admin.password);

    if (!isValidAdmin) {
      // Update rate limit on failure
      const currentAttempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
      loginAttempts.set(ip, { count: currentAttempts.count + 1, lastAttempt: now });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Success - reset rate limit
    loginAttempts.delete(ip);

    // Generate secure auth token
    const token = generateSecureToken();
    
    // Set secure HTTP-only cookie
    cookies().set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: true, // Always true for security headers to work best in modern browsers
      sameSite: 'strict', // Changed from lax to strict for better security
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
