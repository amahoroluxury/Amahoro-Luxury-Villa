import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPaymentConfirmation, sendAdminPaymentNotification } from '@/lib/email';
import { dpo } from '@/lib/dpo';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const text = await request.text();
    
    // DPO Pay Push Webhook often sends XML
    // Ref: https://dpogroup.com/api-and-technical-documentation/
    const tokenMatch = text.match(/<TransToken>(.*?)<\/TransToken>/);
    const statusMatch = text.match(/<TransactionApproval>(.*?)<\/TransactionApproval>/);
    const refMatch = text.match(/<TransRef>(.*?)<\/TransRef>/);

    const transToken = tokenMatch ? tokenMatch[1] : '';
    const status = statusMatch ? statusMatch[1] : '';
    const transRef = refMatch ? refMatch[1] : '';

    if (!transToken) {
      return NextResponse.json({ received: true });
    }

    const transaction = await prisma.paymentTransaction.findUnique({
      where: { providerToken: transToken },
      include: { booking: true },
    });

    if (!transaction) return NextResponse.json({ received: true });

    const isApproved = status === 'Authorized' || status === 'Approved' || status === 'Handled';

    if (isApproved) {
      if (transaction.status !== 'success') {
        const booking = transaction.booking;
        const paidAmountUsd = transaction.amountUsd;
        
        const newPaidAmount = booking.amountPaidUsd + paidAmountUsd;
        const isFullyPaid = (booking.totalAmountUsd - newPaidAmount) < 0.05;

        // Update Transaction
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            status: 'success',
            providerReference: transRef || undefined
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
    } else {
      // Possible failure
      if (text.includes('Declined') || text.includes('Cancelled')) {
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: { status: 'failed' },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

