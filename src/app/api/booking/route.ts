import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAvailability, calculatePrice } from '@/lib/booking-logic';
import { differenceInDays } from 'date-fns';
import { sendBookingConfirmation, sendAdminNewBookingNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guests, name, email, phone, requests } = body;

    // Basic Input Validation
    if (!checkIn || !checkOut || !guests || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (guests < 1 || guests > 10) {
       return NextResponse.json({ error: 'Invalid guest count' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 1. Re-verify availability
    const available = await getAvailability(new Date(checkIn), new Date(checkOut));
    if (!available) {
      return NextResponse.json({ error: 'Dates no longer available' }, { status: 400 });
    }

    // 2. Calculate final price
    const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
    const price = await calculatePrice(nights);

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

    // 4. Send email notifications (non-blocking)
    const emailData = {
      guestName: name,
      guestEmail: email,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalAmountUsd: price.total,
      depositAmountUsd: price.deposit,
      bookingId: booking.id,
      guestsCount: guests,
    };

    // Fire and forget - don't block the response
    Promise.all([
      sendBookingConfirmation(emailData),
      sendAdminNewBookingNotification(emailData),
    ]).catch(console.error);

    return NextResponse.json({ id: booking.id });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
