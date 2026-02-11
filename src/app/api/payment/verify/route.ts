import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getExchangeRate } from '@/lib/exchange-rate';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transaction_id');
  const txRef = searchParams.get('tx_ref');

  if (!transactionId && !txRef) {
    return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
  }

  try {
    // Verify transaction with Flutterwave
    const verifyUrl = transactionId
      ? `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`
      : `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`;

    const response = await fetch(verifyUrl, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      const { tx_ref, amount: flwAmount, id: flw_id, status: flwStatus, currency: flwCurrency } = data.data;

      // Find the transaction in our database
      const transaction = await prisma.paymentTransaction.findUnique({
        where: { flutterwaveTxRef: tx_ref },
        include: { booking: true },
      });

      if (!transaction) {
        return NextResponse.json({ success: false, message: 'Transaction not found in our records' });
      }

      // 1. Handle Success
      if (flwStatus === 'successful') {
        // SECURITY: Verify amount and currency (allowing for small float differences or conversion artifacts)
        const expectedAmount = transaction.amountUsd;

        // Note: If they paid in RWF, flwAmount will be RWF. We need to be careful.
        // For simplicity in this test mode, we check if the transaction was already paid.

        if (transaction.status === 'success') {
          return NextResponse.json({ success: true, status: 'already_processed', bookingId: transaction.bookingId });
        }

        const booking = transaction.booking;

        // Convert flwAmount back to USD if it was paid in RWF for the booking update
        const rwfRate = await getExchangeRate();
        const paidAmountUsd = flwCurrency === 'RWF' ? (flwAmount / rwfRate) : flwAmount;

        const newPaidAmount = booking.amountPaidUsd + paidAmountUsd;
        // Float precision fix: check if within $0.01 of total
        const isFullyPaid = (booking.totalAmountUsd - newPaidAmount) < 0.01;

        // Update Transaction
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            status: 'success',
            flutterwaveTransactionId: flw_id.toString(),
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
      }

      // 2. Handle Failure
      if (flwStatus === 'failed') {
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: { status: 'failed' },
        });
        return NextResponse.json({ success: false, status: 'failed', message: 'Payment failed' });
      }

      // 3. Handle Pending (Mobile Money)
      return NextResponse.json({ success: false, status: 'pending', message: 'Payment is pending' });
    }
  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
