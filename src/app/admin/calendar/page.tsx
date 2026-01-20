import Link from 'next/link';
import prisma from '@/lib/prisma';
import CalendarManager from '@/components/CalendarManager';
import styles from './calendar.module.css';

async function getBlockedDates() {
  return await prisma.blockedDate.findMany({
    orderBy: { date: 'asc' },
  });
}

export default async function AdminCalendarPage() {
  const blockedDates = await getBlockedDates();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1>Calendar Management</h1>
            <nav className={styles.adminNav}>
              <Link href="/admin/bookings">Bookings</Link>
              <Link href="/admin/calendar" className={styles.active}>Calendar</Link>
              <Link href="/">Main Site</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.calendarView}>
              <CalendarManager initialBlocked={blockedDates.map((b: any) => b.date.toISOString())} />
            </div>
            <div className={styles.blockedList}>
              <section className={styles.section}>
                <h2>Blocked Dates</h2>
                <div className={styles.list}>
                  {blockedDates.length === 0 ? (
                    <p className={styles.empty}>No manually blocked dates.</p>
                  ) : (
                    blockedDates.map((block: any) => (
                      <div key={block.id} className={styles.blockRow}>
                        <span>{new Date(block.date).toLocaleDateString()}</span>
                        <strong>{block.reason || 'No reason'}</strong>
                        <button className={styles.deleteBtn}>Remove</button>
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

