import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get Bookings Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      specialRequests,
      totalAmountUsd,
      status = 'PendingDeposit',
    } = body;

    // Validate required fields
    if (!guestName || !guestEmail || !checkIn || !checkOut || !totalAmountUsd) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const depositAmountUsd = totalAmountUsd * 0.5;

    const booking = await prisma.booking.create({
      data: {
        guestName,
        guestEmail,
        guestPhone: guestPhone || '',
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestsCount: guestsCount || 1,
        specialRequests,
        totalAmountUsd,
        depositAmountUsd,
        balanceDueUsd: totalAmountUsd,
        status,
        paymentStatus: 'Unpaid',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
