import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.balanceDueUsd <= 0) {
      return NextResponse.json(
        { error: 'No balance due' },
        { status: 400 }
      );
    }

    const payBalanceUrl = `${process.env.SITE_URL}/pay-balance/${booking.id}`;

    return NextResponse.json({
      success: true,
      link: payBalanceUrl,
      amount: booking.balanceDueUsd,
    });
  } catch (error) {
    console.error('Payment Link Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
