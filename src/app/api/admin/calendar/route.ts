import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch all blocked dates and confirmed bookings for calendar display
export async function GET() {
  try {
    const [blockedDates, bookings] = await Promise.all([
      prisma.blockedDate.findMany({
        orderBy: { date: 'asc' },
      }),
      prisma.booking.findMany({
        where: {
          status: {
            in: ['DepositPaid', 'FullyPaid'],
          },
        },
        select: {
          id: true,
          guestName: true,
          checkIn: true,
          checkOut: true,
          status: true,
        },
        orderBy: { checkIn: 'asc' },
      }),
    ]);

    return NextResponse.json({
      blockedDates: blockedDates.map(bd => ({
        id: bd.id,
        date: bd.date.toISOString(),
        reason: bd.reason,
      })),
      bookings: bookings.map(b => ({
        id: b.id,
        guestName: b.guestName,
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        status: b.status,
      })),
    });
  } catch (error) {
    console.error('Calendar GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Block a date
export async function POST(request: Request) {
  try {
    const { date, reason } = await request.json();

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const dateObj = new Date(date);
    dateObj.setUTCHours(0, 0, 0, 0);

    // Check if already blocked
    const existing = await prisma.blockedDate.findUnique({
      where: { date: dateObj },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Date is already blocked' },
        { status: 400 }
      );
    }

    const blocked = await prisma.blockedDate.create({
      data: {
        date: dateObj,
        reason: reason || null,
      },
    });

    return NextResponse.json({
      success: true,
      blocked: {
        id: blocked.id,
        date: blocked.date.toISOString(),
        reason: blocked.reason,
      },
    });
  } catch (error) {
    console.error('Calendar POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Unblock a date
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const date = searchParams.get('date');

    if (!id && !date) {
      return NextResponse.json(
        { error: 'Either id or date is required' },
        { status: 400 }
      );
    }

    if (id) {
      await prisma.blockedDate.delete({
        where: { id },
      });
    } else if (date) {
      const dateObj = new Date(date);
      dateObj.setUTCHours(0, 0, 0, 0);
      await prisma.blockedDate.delete({
        where: { date: dateObj },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Calendar DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to unblock date' },
      { status: 500 }
    );
  }
}
