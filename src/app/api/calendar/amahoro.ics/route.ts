import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import ICAL from 'ical.js';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [blockedDates, bookings] = await Promise.all([
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

        const comp = new ICAL.Component(['vcalendar', [], []]);
        comp.updatePropertyWithValue('prodid', '-//Amahoro Luxury Villa//EN');
        comp.updatePropertyWithValue('version', '2.0');
        comp.updatePropertyWithValue('calscale', 'GREGORIAN');
        comp.updatePropertyWithValue('method', 'PUBLISH');

        // Add bookings as events
        bookings.forEach(booking => {
            const vevent = new ICAL.Component('vevent');
            const event = new ICAL.Event(vevent);
            
            event.uid = `booking-${booking.id}@amahoroluxuryvilla.com`;
            event.summary = 'Amahoro Villa Booking';
            event.startDate = ICAL.Time.fromJSDate(booking.checkIn, true);
            event.endDate = ICAL.Time.fromJSDate(booking.checkOut, true);
            event.description = 'Confirmed booking reservation';
            
            comp.addSubcomponent(vevent);
        });

        // Add blocked dates as events
        // Group consecutive blocked dates into single events
        if (blockedDates.length > 0) {
            let currentStart = blockedDates[0].date;
            let currentEnd = new Date(currentStart);
            currentEnd.setDate(currentEnd.getDate() + 1); // Assuming blockedDate represents a single day

            const addBlockEvent = (start: Date, end: Date, reason: string | null, id: string) => {
                const vevent = new ICAL.Component('vevent');
                const event = new ICAL.Event(vevent);
                
                event.uid = `block-${id}@amahoroluxuryvilla.com`;
                event.summary = reason || 'Admin Blocked Date';
                event.startDate = ICAL.Time.fromJSDate(start, true);
                event.endDate = ICAL.Time.fromJSDate(end, true);
                event.description = 'Dates blocked by administrator';
                
                comp.addSubcomponent(vevent);
            };

            for (let i = 1; i < blockedDates.length; i++) {
                const block = blockedDates[i];
                const expectedNextDay = new Date(currentEnd);
                
                // Compare ignoring time
                if (block.date.toISOString().split('T')[0] === expectedNextDay.toISOString().split('T')[0]) {
                    // Extend current block
                    currentEnd.setDate(currentEnd.getDate() + 1);
                } else {
                    // Output current block and start a new one
                    addBlockEvent(currentStart, currentEnd, blockedDates[i-1].reason, blockedDates[i-1].id);
                    currentStart = block.date;
                    currentEnd = new Date(currentStart);
                    currentEnd.setDate(currentEnd.getDate() + 1);
                }
            }
            // Add the last block
            addBlockEvent(currentStart, currentEnd, blockedDates[blockedDates.length - 1].reason, blockedDates[blockedDates.length - 1].id);
        }

        const icalString = comp.toString();

        return new NextResponse(icalString, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="amahoro-villa-calendar.ics"',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });

    } catch (error) {
        console.error('Export Calendar API Error:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
