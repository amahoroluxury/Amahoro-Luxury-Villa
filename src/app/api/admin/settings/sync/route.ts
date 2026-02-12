import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { clearIcalCache } from '@/lib/booking-logic';
import { getExternalBlockedDates } from '@/lib/ical';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        const settings = await prisma.settings.findFirst();
        if (!settings?.airbnbIcalUrl) {
            return NextResponse.json({ error: 'No iCal URL configured' }, { status: 400 });
        }

        // Attempt actual sync to validate URL
        let syncError = null;
        try {
            await getExternalBlockedDates(settings.airbnbIcalUrl);
            clearIcalCache();
        } catch (err: any) {
            syncError = err.message || 'Failed to fetch or parse iCal feed';
        }

        // Update settings with result
        await prisma.settings.update({
            where: { id: settings.id },
            data: {
                lastIcalSync: syncError ? undefined : new Date(),
                icalSyncError: syncError || null
            }
        });

        if (syncError) {
            return NextResponse.json({ error: syncError }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'iCal synchronization successful.'
        });
    } catch (error) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
