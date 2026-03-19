import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getExchangeRate } from '@/lib/exchange-rate';
import { dpo } from '@/lib/dpo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // DPO usually sends TransactionToken or ID in the redirect
  const transToken = searchParams.get('TransactionToken') || searchParams.get('ID');

  if (!transToken) {
    return NextResponse.json({ error: 'Missing transaction token' }, { status: 400 });
  }

  try {
    // 1. Verify with DPO
    const dpoData = await dpo.verifyPayment(transToken);

    // 2. Find transaction
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { providerToken: transToken },
      include: { booking: true },
    });

    if (!transaction) {
      return NextResponse.json({ success: false, message: 'Transaction not found or already processed' });
    }

    // 3. Handle Status
    // DPO returns Result: '000' for recognized token, but we need TransactionApproval check
    if (dpoData.result === '000') {
      const isApproved = dpoData.status === 'Authorized' || dpoData.status === 'Approved' || dpoData.status === 'Handled';

      if (isApproved) {
        if (transaction.status === 'success') {
          return NextResponse.json({ success: true, status: 'already_processed', bookingId: transaction.bookingId });
        }

        const booking = transaction.booking;
        const paidAmountUsd = transaction.amountUsd; // We logged this during initialization

        const newPaidAmount = booking.amountPaidUsd + paidAmountUsd;
        const isFullyPaid = (booking.totalAmountUsd - newPaidAmount) < 0.05;

        // Update Transaction
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            status: 'success',
            providerReference: dpoData.explanation.includes('Reference:') ? dpoData.explanation.split('Reference:')[1].trim() : undefined
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

        return NextResponse.json({
          success: true,
          status: 'verified',
          bookingId: booking.id,
          isFullyPaid,
        });
      } else {
        // Declined or other failure
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: { status: 'failed' },
        });
        return NextResponse.json({ success: false, status: 'failed', message: `Payment not approved: ${dpoData.explanation}` });
      }
    }

    return NextResponse.json({ success: false, status: 'error', message: dpoData.explanation });

  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
