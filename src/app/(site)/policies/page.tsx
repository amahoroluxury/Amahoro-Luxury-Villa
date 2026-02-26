import { Metadata } from 'next';
import styles from './policies.module.css';

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Review our booking, cancellation, and house rules. We strive to provide a seamless and transparent experience for all guests.',
};

export default function PoliciesPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>House Rules & Terms</span>
          <h1>Our Policies</h1>
          <p className={styles.lead}>
            To ensure a seamless and peaceful experience for all our guests at Amahoro Luxury Villa.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.policyGrid}>

            <div className={styles.policyCard}>
              <div className={styles.icon}>📅</div>
              <h3>Booking & Payments</h3>
              <ul>
                <li><strong>Full Payment:</strong> 100% of the booking amount is required to secure your stay.</li>
                <li><strong>Damage Deposit:</strong> A refundable damage deposit of 20% is collected and returned within 12-24 hours after checkout inspection.</li>
                <li><strong>Check-in:</strong> 2:00 PM</li>
                <li><strong>Check-out:</strong> 11:00 AM</li>
              </ul>
            </div>

            <div className={styles.policyCard}>
              <div className={styles.icon}>🔄</div>
              <h3>Cancellation Policy</h3>
              <ul>
                <li><strong>Full Refund:</strong> Cancellations made 30+ days before check-in receive a 100% refund.</li>
                <li><strong>Partial Refund:</strong> Cancellations between 14-29 days before check-in receive a 50% refund.</li>
                <li><strong>No Refund:</strong> Cancellations made less than 14 days before arrival are non-refundable.</li>
              </ul>
            </div>

            <div className={styles.policyCard}>
              <div className={styles.icon}>🏡</div>
              <h3>House Rules</h3>
              <ul>
                <li><strong>No Smoking:</strong> Smoking is strictly forbidden inside the villa. Designated outdoor areas only.</li>
                <li><strong>No Pets:</strong> We maintain a pet-free environment for all guests.</li>
                <li><strong>Quiet Hours:</strong> 10:00 PM – 7:00 AM to respect our neighbors.</li>
                <li><strong>Max Occupancy:</strong> 8 guests total.</li>
              </ul>
            </div>

            <div className={styles.policyCard}>
              <div className={styles.icon}>🛡️</div>
              <h3>Privacy & Security</h3>
              <ul>
                <li><strong>Security:</strong> 24/7 Gated security and exterior-only cameras for your safety.</li>
                <li><strong>Privacy:</strong> We strictly prohibit interior cameras or surveillance.</li>
                <li><strong>Liability:</strong> Guests are responsible for personal belongings and insurance.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
