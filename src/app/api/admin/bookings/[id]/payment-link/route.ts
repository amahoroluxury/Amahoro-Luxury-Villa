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

    const tx_ref = `AMH-BAL-${booking.id.slice(0, 8)}-${Date.now()}`;

    // Create Flutterwave payment link for balance
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref,
        amount: booking.balanceDueUsd,
        currency: 'USD',
        redirect_url: `${process.env.SITE_URL}/book/payment/verify`,
        customer: {
          email: booking.guestEmail,
          phonenumber: booking.guestPhone,
          name: booking.guestName,
        },
        meta: {
          booking_id: booking.id,
          payment_type: 'balance',
        },
        customizations: {
          title: 'Amahoro Luxury Villa',
          description: `Balance payment for booking`,
          logo: 'https://img.icons8.com/color/96/villa.png',
        },
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      // Log the transaction attempt
      await prisma.paymentTransaction.create({
        data: {
          bookingId: booking.id,
          flutterwaveTxRef: tx_ref,
          amountUsd: booking.balanceDueUsd,
          type: 'balance',
          status: 'pending',
        },
      });

      return NextResponse.json({
        success: true,
        link: data.data.link,
        amount: booking.balanceDueUsd,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate payment link' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment Link Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
