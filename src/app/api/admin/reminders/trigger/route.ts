import { NextResponse } from 'next/server';
import { checkAndSendReminders } from '@/lib/notification-engine';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        const results = await checkAndSendReminders();
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error('Trigger Reminders Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
