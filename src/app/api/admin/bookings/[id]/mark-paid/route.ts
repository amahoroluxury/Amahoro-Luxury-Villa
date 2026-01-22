import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { amount, note } = await request.json();
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

    // Default to marking remaining balance as paid
    const paymentAmount = amount || booking.balanceDueUsd;

    if (paymentAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    const newPaidAmount = booking.amountPaidUsd + paymentAmount;
    const newBalanceDue = Math.max(0, booking.totalAmountUsd - newPaidAmount);
    const isFullyPaid = newBalanceDue === 0;

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        amountPaidUsd: newPaidAmount,
        balanceDueUsd: newBalanceDue,
        status: isFullyPaid ? 'FullyPaid' : 'DepositPaid',
        paymentStatus: isFullyPaid ? 'Paid' : 'Partial',
      },
    });

    // Log the offline transaction
    await prisma.paymentTransaction.create({
      data: {
        bookingId,
        flutterwaveTxRef: `OFFLINE-${Date.now()}`,
        amountUsd: paymentAmount,
        type: isFullyPaid ? 'full' : 'balance',
        status: 'success',
        flutterwaveTransactionId: note || 'Offline payment',
      },
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: `Recorded offline payment of $${paymentAmount.toFixed(2)}`,
    });
  } catch (error) {
    console.error('Mark Paid Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
