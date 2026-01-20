import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('verif-hash');
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;

    if (!signature || signature !== secretHash) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    const { status, tx_ref, amount, id: flw_id, meta } = payload.data || payload;

    if (status === 'successful') {
      const transaction = await prisma.paymentTransaction.findUnique({
        where: { flutterwaveTxRef: tx_ref },
        include: { booking: true },
      });

      if (transaction && transaction.status !== 'success') {
        const booking = transaction.booking;
        const newPaidAmount = booking.amountPaidUsd + amount;
        const isFullyPaid = newPaidAmount >= booking.totalAmountUsd;

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
            balanceDueUsd: booking.totalAmountUsd - newPaidAmount,
            status: isFullyPaid ? 'FullyPaid' : 'DepositPaid',
            paymentStatus: isFullyPaid ? 'Paid' : 'Partial',
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
