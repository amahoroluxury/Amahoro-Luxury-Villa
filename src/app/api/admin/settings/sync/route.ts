import { NextResponse } from 'next/server';
import { clearIcalCache } from '@/lib/booking-logic';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        clearIcalCache();
        return NextResponse.json({
            success: true,
            message: 'iCal cache cleared. Availability will be refreshed on next request.'
        });
    } catch (error) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
