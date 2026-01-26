import { NextResponse } from 'next/server';
import { calculatePrice } from '@/lib/booking-logic';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nights = parseInt(searchParams.get('nights') || '0');

  if (nights <= 0) {
    return NextResponse.json({ error: 'Invalid number of nights' }, { status: 400 });
  }

  try {
    const price = await calculatePrice(nights);
    return NextResponse.json(price);
  } catch (error) {
    console.error('Price API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
