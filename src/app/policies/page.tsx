import styles from './policies.module.css';

export default function PoliciesPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Guest Information</span>
          <h1>Policies & House Rules</h1>
          <p className={styles.lead}>
            To ensure a peaceful and high-quality experience for all guests, please review our policies.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.policySection}>
              <h2>Booking & Payment</h2>
              <p>
                A minimum 50% deposit is required to confirm your booking. 
                The remaining balance must be paid before check-in. 
                We accept online payments via Flutterwave (Credit/Debit, Mobile Money) or Bank Transfers.
              </p>
            </div>

            <div className={styles.policySection}>
              <h2>Cancellation</h2>
              <ul>
                <li><strong>Full Refund:</strong> Cancellations made at least 7 days before check-in.</li>
                <li><strong>50% Refund:</strong> Cancellations made between 2-7 days before check-in.</li>
                <li><strong>No Refund:</strong> Cancellations made less than 48 hours before check-in.</li>
              </ul>
            </div>

            <div className={styles.policySection}>
              <h2>House Rules</h2>
              <ul>
                <li>Check-in: 2:00 PM | Check-out: 11:00 AM</li>
                <li>No smoking indoors.</li>
                <li>Outdoor quiet hours begin at 10:00 PM.</li>
                <li>Small gatherings allowed only with prior approval.</li>
                <li>Maximum occupancy: 8 guests.</li>
              </ul>
            </div>

            <div className={styles.policySection}>
              <h2>Safety & Privacy</h2>
              <p>
                Amahoro Luxury Villa  is located in a secure gated neighborhood with 24/7 security. 
                Our house manager is available on-site for any assistance during your stay. 
                Your privacy is our priority—the entire villa is for your exclusive use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
