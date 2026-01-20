import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import styles from './bookings.module.css';

async function getBookings() {
  return await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1>Admin Dashboard</h1>
            <nav className={styles.adminNav}>
              <Link href="/admin/bookings" className={styles.active}>Bookings</Link>
              <Link href="/admin/calendar">Calendar</Link>
              <Link href="/">Main Site</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span>Total Bookings</span>
              <strong>{bookings.length}</strong>
            </div>
            <div className={styles.statCard}>
              <span>Pending Deposit</span>
              <strong>{bookings.filter((b: any) => b.status === 'PendingDeposit').length}</strong>
            </div>
            <div className={styles.statCard}>
              <span>Confirmed</span>
              <strong>{bookings.filter((b: any) => b.status === 'DepositPaid' || b.status === 'FullyPaid').length}</strong>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Dates</th>
                  <th>Nights</th>
                  <th>Total</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any) => (
                  <tr key={booking.id}>
                    <td>
                      <div className={styles.guestInfo}>
                        <strong>{booking.guestName}</strong>
                        <span>{booking.guestEmail}</span>
                      </div>
                    </td>
                    <td>
                      {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                    </td>
                    <td>-</td>
                    <td>${booking.totalAmountUsd}</td>
                    <td>${booking.amountPaidUsd}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/bookings/${booking.id}`} className={styles.viewLink}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
