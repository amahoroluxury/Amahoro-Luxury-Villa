import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Metadata } from 'next';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have questions or special requests? Reach out via WhatsApp, email, or our contact form to plan your perfect Kigali stay.',
};

export default function ContactPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Get in Touch</span>
          <h1>Contact us & plan your stay</h1>
          <p className={styles.lead}>
            Have questions, special requests, or want to arrange a private chef or airport pickup?
            Send us a message and our team will respond promptly.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <div className={styles.icon}><MessageSquare size={24} /></div>
                <div>
                  <h3>WhatsApp</h3>
                  <p>Inquire via WhatsApp</p>
                  <a href="https://wa.me/250781871487?text=I'm%20interested%20in%20booking%20Amahoro%20Luxury%20Villa" className={styles.link}>Chat with us</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.icon}><Mail size={24} /></div>
                <div>
                  <h3>Email</h3>
                  <p>General inquiries</p>
                  <a href="mailto:booking@amahoroluxuryvilla.com" className={styles.link}>booking@amahoroluxuryvilla.com</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.icon}><Phone size={24} /></div>
                <div>
                  <h3>Phone</h3>
                  <p>House Management</p>
                  <a href="tel:+250781871487" className={styles.link}>Call for urgent matters</a>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <form className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="E.g. John Doe" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input type="tel" id="phone" placeholder="+250..." />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="guests">Number of Guests</label>
                    <input type="number" id="guests" min="1" max="8" placeholder="1-8" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">How can we help?</label>
                  <textarea id="message" rows={6} placeholder="Tell us about your plans..."></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
