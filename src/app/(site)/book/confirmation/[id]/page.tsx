import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import styles from './confirmation.module.css';

export const dynamic = 'force-dynamic';

async function getBooking(id: string) {
  return await prisma.booking.findUnique({
    where: { id },
  });
}

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id);

  if (!booking) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <h1>Booking not found</h1>
          <Link href="/book" className={styles.primaryBtn}>Return to Booking</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.label}>Reservation Confirmed</span>
          <h1>Thank you, {booking.guestName}!</h1>
          <p className={styles.lead}>
            Your reservation request has been received. Please complete the full payment to secure your dates.
          </p>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span>Booking Ref:</span>
              <strong>#{booking.id.slice(0, 8).toUpperCase()}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Dates:</span>
              <strong>{format(new Date(booking.checkIn), 'MMM dd, yyyy')} — {format(new Date(booking.checkOut), 'MMM dd, yyyy')}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Total Amount:</span>
              <strong>${booking.totalAmountUsd}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Amount Due:</span>
              <strong className={styles.highlight}>${booking.totalAmountUsd}</strong>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/book/payment/${booking.id}`} className={styles.primaryBtn}>
              Pay Now
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Contact Host
            </Link>
          </div>

          <p className={styles.note}>
            A confirmation email has been sent to {booking.guestEmail}.
            Please note that your booking is only guaranteed once full payment is received.
          </p>
        </div>
      </div>
    </div>
  );
}
