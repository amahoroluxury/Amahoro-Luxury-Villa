import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getExternalBlockedDates } from '@/lib/ical';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [settings, blockedDates, bookings] = await Promise.all([
            prisma.settings.findFirst(),
            prisma.blockedDate.findMany({
                orderBy: { date: 'asc' },
            }),
            prisma.booking.findMany({
                where: {
                    status: { in: ['DepositPaid', 'FullyPaid'] },
                },
                select: {
                    id: true,
                    checkIn: true,
                    checkOut: true,
                },
            }),
        ]);

        let externalBlocks: any[] = [];
        if (settings?.airbnbIcalUrl) {
            try {
                const blocks = await getExternalBlockedDates(settings.airbnbIcalUrl);
                externalBlocks = blocks.map(b => ({
                    id: `ext-${b.start.getTime()}`,
                    date: b.start.toISOString(),
                    endDate: b.end.toISOString(),
                    reason: 'Airbnb Booking',
                    isExternal: true
                }));
            } catch (err) {
                console.error('Failed to fetch external blocks for public calendar');
            }
        }

        const publicBlocked = [
            ...blockedDates.map(b => ({ id: b.id, date: b.date.toISOString(), reason: b.reason })),
            ...externalBlocks
        ];

        const publicBookings = bookings.map(b => ({
            id: b.id,
            name: 'Booked', // Hide guest names for privacy
            checkIn: b.checkIn.toISOString(),
            checkOut: b.checkOut.toISOString(),
            status: 'Confirmed'
        }));

        return NextResponse.json({
            blocked: publicBlocked,
            bookings: publicBookings
        });
    } catch (error) {
        console.error('Public Calendar API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
