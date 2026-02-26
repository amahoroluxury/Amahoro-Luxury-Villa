import { Metadata } from 'next';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Your privacy matters. Learn how Amahoro Luxury Villa handles and protects your personal data during your stay.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Legal</span>
          <h1>Privacy Policy</h1>
          <p className={styles.lead}>
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.content}>
            <div className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you strictly provide to us when making a booking or contacting us. This may include:
              </p>
              <ul>
                <li>Personal identification information (Name, email address, phone number).</li>
                <li>Booking details (Dates of stay, number of guests).</li>
                <li>Payment information (processed securely through our payment providers).</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>
                The information we collect is used solely for the purpose of:
              </p>
              <ul>
                <li>Processing your reservation and ensuring a smooth check-in process.</li>
                <li>Communicating with you regarding your stay.</li>
                <li>Improving our services and website experience.</li>
                <li> complying with legal obligations.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We do not sell or share your personal data with third parties for marketing purposes.
              </p>
            </div>

            <div className={styles.section}>
              <h2>4. Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some website functionality.
              </p>
            </div>

            <div className={styles.section}>
              <h2>5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at info@amahoroluxuryvilla.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
