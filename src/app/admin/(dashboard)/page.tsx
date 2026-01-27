import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format, startOfMonth, endOfMonth, isAfter } from 'date-fns';
import styles from './dashboard.module.css';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const [bookings, settings] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { checkIn: 'asc' },
    }),
    prisma.settings.findFirst(),
  ]);

  const confirmedBookings = bookings.filter((b: any) => b.status === 'DepositPaid' || b.status === 'FullyPaid');
  
  // Calculate revenue this month
  const monthlyRevenue = confirmedBookings
    .filter((b: any) => isAfter(new Date(b.createdAt), monthStart))
    .reduce((sum: number, b: any) => sum + b.amountPaidUsd, 0);

  // Upcoming check-ins
  const upcoming = bookings
    .filter((b: any) => isAfter(new Date(b.checkIn), now) && b.status !== 'Cancelled')
    .slice(0, 5);

  // Occupancy rate (guest nights / days in month)
  const pendingDeposit = bookings.filter((b: any) => b.status === 'PendingDeposit').length;

  return {
    stats: {
      totalRevenue: confirmedBookings.reduce((sum: number, b: any) => sum + b.amountPaidUsd, 0),
      monthlyRevenue,
      confirmedCount: confirmedBookings.length,
      pendingCount: pendingDeposit,
    },
    upcoming,
    settings: settings || { nightlyRate: 500 },
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="admin-container">
          <h1>Dashboard Overview</h1>
          <p className={styles.subtitle}>Welcome back to the Amahoro Admin Portal.</p>
        </div>
      </header>

      <div className="admin-container">
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Lifetime Revenue</span>
            <strong>${data.stats.totalRevenue.toLocaleString()}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Revenue (This Month)</span>
            <strong>${data.stats.monthlyRevenue.toLocaleString()}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Confirmed Stays</span>
            <strong>{data.stats.confirmedCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Pending Bookings</span>
            <strong>{data.stats.pendingCount}</strong>
          </div>
        </div>

        <div className={styles.mainContent}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Upcoming Check-ins</h2>
              <Link href="/admin/bookings" className={styles.textLink}>View All</Link>
            </div>
            <div className={styles.recentList}>
              {data.upcoming.length === 0 ? (
                <p className={styles.empty}>No upcoming check-ins.</p>
              ) : (
                data.upcoming.map((booking: any) => (
                  <div key={booking.id} className={styles.bookingItem}>
                    <div className={styles.bookingMain}>
                      <strong>{booking.guestName}</strong>
                      <span>{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className={styles.bookingStatus}>
                      <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                        {booking.status}
                      </span>
                    </div>
                    <Link href={`/admin/bookings/${booking.id}`} className={styles.detailBtn}>Details &rarr;</Link>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className={styles.quickActions}>
            <h2>Management</h2>
            <div className={styles.actionButtons}>
              <Link href="/admin/calendar" className={styles.actionBtn}>
                Update Availability
              </Link>
              <Link href="/admin/settings" className={styles.actionBtn}>
                Edit Nightly Rate
              </Link>
              <Link href="/admin/bookings" className={styles.actionBtn}>
                Review Bookings
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
