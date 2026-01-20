import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import styles from './details.module.css';

async function getBooking(id: string) {
  return await prisma.booking.findUnique({
    where: { id },
  });
}

export default async function BookingDetailsPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id);

  if (!booking) return <div>Booking not found</div>;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/admin/bookings" className={styles.backLink}>&larr; Back to Bookings</Link>
            <h1>Booking Details</h1>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.mainInfo}>
              <section className={styles.section}>
                <h2>Guest Information</h2>
                <div className={styles.infoRow}>
                  <span>Name:</span> <strong>{booking.guestName}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Email:</span> <strong>{booking.guestEmail}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Phone:</span> <strong>{booking.guestPhone}</strong>
                </div>
                {booking.specialRequests && (
                  <div className={styles.infoRow}>
                    <span>Special Requests:</span> 
                    <p className={styles.requestNote}>{booking.specialRequests}</p>
                  </div>
                )}
              </section>

              <section className={styles.section}>
                <h2>Stay Details</h2>
                <div className={styles.infoRow}>
                  <span>Dates:</span> 
                  <strong>{format(new Date(booking.checkIn), 'MMM dd, yyyy')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Guests:</span> <strong>{booking.guestsCount}</strong>
                </div>
              </section>
            </div>

            <div className={styles.paymentInfo}>
              <section className={styles.section}>
                <h2>Payment Status</h2>
                <div className={styles.statusBadge}>
                  <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                    {booking.status}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span>Total Amount:</span> <strong>${booking.totalAmountUsd}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Amount Paid:</span> <strong>${booking.amountPaidUsd}</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Balance Due:</span> <strong className={styles.due}>${booking.balanceDueUsd}</strong>
                </div>

                <div className={styles.actions}>
                  <button className={styles.primaryBtn}>Mark Paid (Offline)</button>
                  <button className={styles.secondaryBtn}>Generate Balance Link</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
