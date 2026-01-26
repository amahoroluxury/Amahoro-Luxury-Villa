import Link from 'next/link';
import prisma from '@/lib/prisma';
import VisualCalendar from '@/components/VisualCalendar';
import CalendarManager from '@/components/CalendarManager';
import styles from './calendar.module.css';

export const dynamic = 'force-dynamic';

async function getCalendarData() {
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
        guestName: true,
        checkIn: true,
        checkOut: true,
        status: true,
      },
    }),
  ]);

  return {
    blockedDates: blockedDates.map(b => ({
      id: b.id,
      date: b.date.toISOString(),
      reason: b.reason,
    })),
    bookings: bookings.map(b => ({
      id: b.id,
      name: b.guestName,
      checkIn: b.checkIn.toISOString(),
      checkOut: b.checkOut.toISOString(),
      status: b.status,
    })),
  };
}

export default async function AdminCalendarPage() {
  const { blockedDates, bookings } = await getCalendarData();

  return (
    <div className={styles.wrapper}>
      <main className="section-padding">
        <div className="container">
          <div className={styles.mainGrid}>
            <div className={styles.calendarSection}>
              <VisualCalendar 
                initialBlocked={blockedDates} 
                initialBookings={bookings} 
              />
            </div>
            <div className={styles.controlsSection}>
              <CalendarManager />
              
              <section className={styles.section}>
                <h3>Manual Blocks</h3>
                <div className={styles.list}>
                  {blockedDates.length === 0 ? (
                    <p className={styles.empty}>No manual blocks.</p>
                  ) : (
                    blockedDates.map((block: any) => (
                      <div key={block.id} className={styles.blockRow}>
                        <div className={styles.blockInfo}>
                          <strong>{new Date(block.date).toLocaleDateString()}</strong>
                          <span>{block.reason || 'No reason'}</span>
                        </div>
                        <button className={styles.deleteBtn}>&times;</button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
