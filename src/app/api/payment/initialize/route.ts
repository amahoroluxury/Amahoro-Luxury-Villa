import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { bookingId, type, currency = 'USD' } = await request.json(); // type: deposit, full, balance

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Base amount in USD
    const amountUsd = type === 'deposit' ? booking.depositAmountUsd : booking.totalAmountUsd;
    
    // Convert to RWF if requested (simplified for now, using a fixed rate)
    const RWF_RATE = 1300;
    const finalAmount = currency === 'RWF' ? Math.round(amountUsd * RWF_RATE) : amountUsd;
    const finalCurrency = currency;
    
    const tx_ref = `AMH-${booking.id.slice(0, 8)}-${Date.now()}`;

    // Flutterwave Standard Payment Request
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref,
        amount: finalAmount,
        currency: finalCurrency,
        redirect_url: `${process.env.SITE_URL}/book/payment/verify`,
        customer: {
          email: booking.guestEmail,
          phonenumber: booking.guestPhone,
          name: booking.guestName,
        },
        meta: {
          booking_id: booking.id,
          payment_type: type,
        },
        // Force specific options to ensure visibility
        payment_options: currency === 'RWF' ? 'card,mobilemoneyrwanda' : 'card,paypal',
        customizations: {
          title: ' Amahoro Luxury Villa ',
          description: `Payment for stay: ${type} (${currency})`,
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
          amountUsd: amountUsd, // Store the USD value for accounting
          type,
          status: 'pending',
        }
      });

      return NextResponse.json({ link: data.data.link });
    } else {
      return NextResponse.json({ error: 'Flutterwave error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Payment Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
