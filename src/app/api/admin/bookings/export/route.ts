import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const adminToken = cookies().get('admin_auth_token');
    if (!adminToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Define CSV headers
    const headers = [
      'Booking ID',
      'Guest Name',
      'Email',
      'Check In',
      'Check Out',
      'Nights',
      'Total Amount',
      'Status',
      'Created At',
    ];

    // Convert bookings to CSV rows
    const rows = bookings.map((b) => [
      b.id,
      `"${b.guestName}"`, // Quote to handle commas in names
      b.guestEmail,
      b.checkIn.toISOString().split('T')[0],
      b.checkOut.toISOString().split('T')[0],
      Math.ceil((b.checkOut.getTime() - b.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
      b.amountPaidUsd,
      b.status,
      b.createdAt.toISOString().split('T')[0],
    ]);

    // specific CSV string construction
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Return as downloadable file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="bookings-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
