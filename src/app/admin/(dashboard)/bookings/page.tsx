import Link from 'next/link';
import prisma from '@/lib/prisma';
import styles from './bookings.module.css';
import BookingList from './BookingList';

export const dynamic = 'force-dynamic';

async function getBookings() {
  const data = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });
  
  // Convert dates to strings for client components
  return data.map(b => ({
    ...b,
    checkIn: b.checkIn.toISOString(),
    checkOut: b.checkOut.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className={styles.wrapper}>
      <div className="admin-container">
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Bookings</span>
            <strong className={styles.statValue}>{bookings.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Pending Deposit</span>
            <strong className={styles.statValue}>{bookings.filter((b: any) => b.status === 'PendingDeposit').length}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Confirmed</span>
            <strong className={styles.statValue}>{bookings.filter((b: any) => b.status === 'DepositPaid' || b.status === 'FullyPaid').length}</strong>
          </div>
        </div>

        <BookingList initialBookings={bookings as any[]} />
      </div>
    </div>
  );
}
