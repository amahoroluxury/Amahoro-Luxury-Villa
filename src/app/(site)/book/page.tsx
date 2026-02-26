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
            Full payment (100%) is required at the time of booking. A 20% refundable damage fee is also collected and will be refunded within 12 hours after checkout supervision, provided the property is left in good condition.
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
