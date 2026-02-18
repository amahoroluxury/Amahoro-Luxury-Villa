import { Metadata } from 'next';
import styles from './faq.module.css';
import FAQContent from '@/components/FAQContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about staying at Amahoro Luxury Villa. Details on airport pickup, check-in, payments, and house rules.',
};

export default function FAQPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Common Questions</span>
          <h1>Everything you need to know</h1>
          <p className={styles.lead}>
            Find answers to common questions about your stay at Amahoro Luxury Villa.
          </p>
        </div>
      </header>

      <FAQContent />
    </div>
  );
}
