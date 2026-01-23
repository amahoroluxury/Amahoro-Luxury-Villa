import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        transactions: {
          where: { status: 'success' },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Calculate total paid from successful transactions
    const totalPaid = booking.transactions.reduce((sum, tx) => sum + tx.amountUsd, 0);
    const balanceDue = Math.max(0, booking.totalAmountUsd - totalPaid);
    
    // Determine new status
    let status = booking.status;
    if (balanceDue <= 0.01) {
      status = 'FullyPaid';
    } else if (totalPaid > 0) {
      status = 'DepositPaid';
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        amountPaidUsd: totalPaid,
        balanceDueUsd: balanceDue,
        status: status,
      },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json({
      message: 'Booking amounts recalculated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Recalculate Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
