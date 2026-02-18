import BookingForm from '@/components/BookingForm';
import { Metadata } from 'next';
import styles from './book.module.css';

export const metadata: Metadata = {
  title: 'Book Your Stay',
  description: 'Secure your reservation at Amahoro Luxury Villa. Afro-Modern comfort and peace await you in Kigali.',
};

export default function BookPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Reservations</span>
          <h1>Book Your Stay at  Amahoro Luxury Villa </h1>
          <p className={styles.lead}>
            A 50% deposit is required to confirm your booking. The remaining balance must be paid before check-in.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
