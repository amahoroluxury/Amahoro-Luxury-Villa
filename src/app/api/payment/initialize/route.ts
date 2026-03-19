import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getExchangeRate } from '@/lib/exchange-rate';
import { dpo } from '@/lib/dpo';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { bookingId, currency = 'USD' } = await request.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Full payment = Total stay * 1.2 (for 20% refundable damage fee)
    const amountUsdTotalPlusFee = Math.round(booking.totalAmountUsd * 1.2);
    
    // Get dynamic exchange rate
    const rwfRate = await getExchangeRate();
    const finalAmount = currency === 'RWF' ? Math.round(amountUsdTotalPlusFee * rwfRate) : amountUsdTotalPlusFee;

    // DPO Pay Request
    const dpoResponse = await dpo.initiatePayment({
      amount: finalAmount,
      currency: currency,
      bookingId: booking.id,
      email: booking.guestEmail,
      firstName: booking.guestName.split(' ')[0] || 'Guest',
      lastName: booking.guestName.split(' ').slice(1).join(' ') || 'User',
      phone: booking.guestPhone,
      serviceDescription: `Amahoro Luxury Villa: Full stay + Refundable Fee (${currency})`,
    });

    if (dpoResponse.success && dpoResponse.redirectUrl) {
      // Log the transaction attempt
      await prisma.paymentTransaction.create({
        data: {
          bookingId: booking.id,
          provider: 'DPO',
          providerToken: dpoResponse.transToken!,
          providerReference: dpoResponse.transRef,
          amountUsd: amountUsdTotalPlusFee, // Log the full USD value
          type: 'full', // Always full now
          status: 'pending',
        }
      });

      return NextResponse.json({ link: dpoResponse.redirectUrl });
    } else {
      console.error('DPO Error:', dpoResponse.error);
      return NextResponse.json({ error: dpoResponse.error || 'DPO Pay initiation failed' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Payment Initialize] Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}
