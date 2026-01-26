import { Mail, Phone, MessageSquare } from 'lucide-react';
import styles from './contact.module.css';

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
                  <p>Chat with us instantly</p>
                  <a href="https://wa.me/250781871487" className={styles.link}>+250 781 871 487</a>
                </div>
              </div>

                <div className={styles.infoItem}>
                  <Mail className={styles.infoIcon} />
                  <div>
                    <h3>Email</h3>
                    <p><a href="mailto:booking@amahoro.com">booking@amahoro.com</a></p>
                  </div>
                </div>

              <div className={styles.infoCard}>
                <div className={styles.icon}><Phone size={24} /></div>
                <div>
                  <h3>Phone</h3>
                  <p>Call our house manager</p>
                  <a href="tel:+250781871487" className={styles.link}>+250 781 871 487</a>
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
