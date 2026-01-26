import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAvailability } from '@/lib/booking-logic';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: 'Missing dates' }, { status: 400 });
  }

  const available = await getAvailability(new Date(checkIn), new Date(checkOut));

  return NextResponse.json({ available });
}
