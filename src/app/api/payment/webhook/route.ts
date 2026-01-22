import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPaymentConfirmation, sendAdminPaymentNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('verif-hash');
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;

    if (!signature || signature !== secretHash) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    const { status, tx_ref, amount: flwAmount, id: flw_id, currency: flwCurrency } = payload.data || payload;

    const transaction = await prisma.paymentTransaction.findUnique({
      where: { flutterwaveTxRef: tx_ref },
      include: { booking: true },
    });

    if (!transaction) return NextResponse.json({ received: true });

    if (status === 'successful') {
      if (transaction.status !== 'success') {
        const booking = transaction.booking;
        
        // Convert RWF back to USD for internal tracking
        const paidAmountUsd = flwCurrency === 'RWF' ? (flwAmount / 1300) : flwAmount;
        const newPaidAmount = booking.amountPaidUsd + paidAmountUsd;
        const isFullyPaid = (booking.totalAmountUsd - newPaidAmount) < 0.01;

        // Update Transaction
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: { 
            status: 'success', 
            flutterwaveTransactionId: flw_id.toString() 
          },
        });

        // Update Booking
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            amountPaidUsd: newPaidAmount,
            balanceDueUsd: Math.max(0, booking.totalAmountUsd - newPaidAmount),
            status: isFullyPaid ? 'FullyPaid' : 'DepositPaid',
            paymentStatus: isFullyPaid ? 'Paid' : 'Partial',
          },
        });

        // Send email notifications (non-blocking)
        const emailData = {
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          totalAmountUsd: booking.totalAmountUsd,
          depositAmountUsd: booking.depositAmountUsd,
          bookingId: booking.id,
          guestsCount: booking.guestsCount,
          amountPaid: paidAmountUsd,
          isFullyPaid,
          balanceDue: Math.max(0, booking.totalAmountUsd - newPaidAmount),
        };

        Promise.all([
          sendPaymentConfirmation(emailData),
          sendAdminPaymentNotification(emailData),
        ]).catch(console.error);
      }
    } else if (status === 'failed') {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: { status: 'failed' },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

