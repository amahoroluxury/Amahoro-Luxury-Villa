import prisma from './prisma';
import { differenceInDays, startOfDay } from 'date-fns';
import { sendStayReminder, sendPreArrivalInfo } from './email';

export async function checkAndSendReminders() {
    const today = startOfDay(new Date());

    // 1. Fetch bookings that are not cancelled and have upcoming check-ins
    const bookings = await prisma.booking.findMany({
        where: {
            status: { in: ['DepositPaid', 'FullyPaid', 'PendingDeposit'] },
            checkIn: { gte: today },
        },
    });

    const results = {
        processed: bookings.length,
        sent7d: 0,
        sent3d: 0,
        sent2d: 0,
        errors: 0,
    };

    for (const booking of bookings) {
        try {
            const daysUntil = differenceInDays(startOfDay(booking.checkIn), today);
            const sent = new Set(booking.remindersSent || []);
            const updatedSent: string[] = Array.from(sent);
            let needsUpdate = false;

            // Logic for Stay Reminders (7 days and 2 days)
            // We send this to everyone to keep them excited, but the template highlights balance if it exists
            if (daysUntil === 7 && !sent.has('7d')) {
                await sendStayReminder({
                    guestName: booking.guestName,
                    guestEmail: booking.guestEmail,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalAmountUsd: booking.totalAmountUsd,
                    depositAmountUsd: booking.depositAmountUsd,
                    bookingId: booking.id,
                    guestsCount: booking.guestsCount,
                    amountPaid: booking.amountPaidUsd,
                    isFullyPaid: booking.balanceDueUsd < 0.05,
                    balanceDue: booking.balanceDueUsd,
                }, 7);
                updatedSent.push('7d');
                needsUpdate = true;
                results.sent7d++;
            }

            if (daysUntil === 2 && !sent.has('2d')) {
                await sendStayReminder({
                    guestName: booking.guestName,
                    guestEmail: booking.guestEmail,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalAmountUsd: booking.totalAmountUsd,
                    depositAmountUsd: booking.depositAmountUsd,
                    bookingId: booking.id,
                    guestsCount: booking.guestsCount,
                    amountPaid: booking.amountPaidUsd,
                    isFullyPaid: booking.balanceDueUsd < 0.05,
                    balanceDue: booking.balanceDueUsd,
                }, 2);
                updatedSent.push('2d');
                needsUpdate = true;
                results.sent2d++;
            }

            // Logic for Pre-arrival Welcome Guide (3 days)
            if (daysUntil === 3 && !sent.has('welcome')) {
                await sendPreArrivalInfo({
                    guestName: booking.guestName,
                    guestEmail: booking.guestEmail,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalAmountUsd: booking.totalAmountUsd,
                    depositAmountUsd: booking.depositAmountUsd,
                    bookingId: booking.id,
                    guestsCount: booking.guestsCount,
                });
                updatedSent.push('welcome');
                needsUpdate = true;
                results.sent3d++;
            }

            if (needsUpdate) {
                await prisma.booking.update({
                    where: { id: booking.id },
                    data: { remindersSent: updatedSent },
                });
            }
        } catch (error) {
            console.error(`Error processing reminders for booking ${booking.id}:`, error);
            results.errors++;
        }
    }

    return results;
}
