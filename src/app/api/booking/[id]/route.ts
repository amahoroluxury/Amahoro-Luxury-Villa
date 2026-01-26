import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Get Booking Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Update Booking Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Cancel the booking instead of deleting
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: 'Cancelled' },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
