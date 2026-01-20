import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAvailability, calculatePrice } from '@/lib/booking-logic';
import { differenceInDays } from 'date-fns';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guests, name, email, phone, requests } = body;

    // 1. Re-verify availability
    const available = await getAvailability(new Date(checkIn), new Date(checkOut));
    if (!available) {
      return NextResponse.json({ error: 'Dates no longer available' }, { status: 400 });
    }

    // 2. Calculate final price
    const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
    const price = calculatePrice(nights);

    // 3. Create booking in DB
    const booking = await prisma.booking.create({
      data: {
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestsCount: guests,
        specialRequests: requests,
        totalAmountUsd: price.total,
        depositAmountUsd: price.deposit,
        balanceDueUsd: price.total, // Full balance due until deposit is paid
        status: 'PendingDeposit',
        paymentStatus: 'Unpaid',
      }
    });

    return NextResponse.json({ id: booking.id });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
