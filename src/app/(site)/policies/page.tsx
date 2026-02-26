import styles from '../faq/faq.module.css';

export default function PoliciesPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Legal & Terms</span>
          <h1>Our Policies</h1>
          <p className={styles.lead}>
            Transparent terms to ensure a smooth and professional relationship with our guests.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.policyContainer}>

            <article className={styles.policyArticle}>
              <h2 className={styles.policyTitle}>Cancellation & Refund Policy</h2>
              <div className={styles.policyContent}>
                <p>We understand that plans can change. Our cancellation policy is designed to be fair to both our guests and our operations:</p>
                <ul className={styles.policyList}>
                  <li><strong>Full Refund:</strong> Cancellations made at least 30 days before the check-in date will receive a 100% refund of the deposit.</li>
                  <li><strong>Partial Refund:</strong> Cancellations made between 14 and 29 days before check-in will receive a 50% refund of the deposit.</li>
                  <li><strong>No Refund:</strong> Cancellations made less than 14 days before check-in are non-refundable.</li>
                </ul>
                <p>Refunds are processed within 7-10 business days via the original payment method (Flutterwave/Card).</p>
              </div>
            </article>

            <article className={styles.policyArticle}>
              <h2 className={styles.policyTitle}>Booking & Payments</h2>
              <div className={styles.policyContent}>
                <p>Full payment (100%) of the rental amount is required at the time of booking. A 20% refundable damage fee is also collected and will be refunded within 12 hours after checkout supervision, provided the property is left in good condition.</p>
                <p>We accept online payments via Flutterwave, which supports Visa, Mastercard, MTN Mobile Money, and PayPal.</p>
              </div>
            </article>

            <article className={styles.policyArticle}>
              <h2 className={styles.policyTitle}>Liability</h2>
              <div className={styles.policyContent}>
                <p>While we take every precaution to ensure guest safety and security, Amahoro Luxury Villa is not liable for loss of personal belongings or injuries sustained on the property. We recommend all guests carry valid travel insurance.</p>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
