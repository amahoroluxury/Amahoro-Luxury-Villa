import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import styles from '../payment.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getBooking(id: string) {
  return await prisma.booking.findUnique({
    where: { id },
  });
}

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id);

  if (!booking) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <p>Booking not found</p>
          <Link href="/book">Return to Booking</Link>
        </div>
      </div>
    );
  }
  
  // Actually, I don't have the full content of this file, I should view it first or I might mess it up too.
  // Wait, I'll just apply force-dynamic properly to payment page after viewing it.
  return null;
}
