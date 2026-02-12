const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { addDays, startOfDay } = require('date-fns');

async function setupTestData() {
    console.log('--- Setting up test data for reminders ---');

    const today = startOfDay(new Date());
    const checkIn7d = addDays(today, 7);
    const checkIn3d = addDays(today, 3);
    const checkIn2d = addDays(today, 2);

    const bookings = [
        {
            guestName: 'Remind 7d Guest',
            guestEmail: '7d@test.com',
            guestPhone: '123',
            checkIn: checkIn7d,
            checkOut: addDays(checkIn7d, 2),
            guestsCount: 2,
            totalAmountUsd: 1000,
            depositAmountUsd: 500,
            amountPaidUsd: 500,
            balanceDueUsd: 500,
            status: 'DepositPaid',
            paymentStatus: 'Partial',
            remindersSent: []
        },
        {
            guestName: 'Welcome 3d Guest',
            guestEmail: '3d@test.com',
            guestPhone: '456',
            checkIn: checkIn3d,
            checkOut: addDays(checkIn3d, 2),
            guestsCount: 4,
            totalAmountUsd: 2000,
            depositAmountUsd: 1000,
            amountPaidUsd: 2000,
            balanceDueUsd: 0,
            status: 'FullyPaid',
            paymentStatus: 'Paid',
            remindersSent: []
        },
        {
            guestName: 'Urgent 2d Guest',
            guestEmail: '2d@test.com',
            guestPhone: '789',
            checkIn: checkIn2d,
            checkOut: addDays(checkIn2d, 1),
            guestsCount: 1,
            totalAmountUsd: 500,
            depositAmountUsd: 250,
            amountPaidUsd: 250,
            balanceDueUsd: 250,
            status: 'DepositPaid',
            paymentStatus: 'Partial',
            remindersSent: []
        }
    ];

    for (const b of bookings) {
        const created = await prisma.booking.create({ data: b });
        console.log(`Created booking for ${b.guestName} (ID: ${created.id})`);
    }
}

setupTestData()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
