import Link from 'next/link';
import styles from './page.module.css';
import InstagramFeed from '@/components/InstagramFeed';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>A Sanctuary of Peace in the Heart of Kigali</h1>
            <p className={styles.subtitle}>Experience Afro-Modern luxury, comfort, and unforgettable hospitality.</p>
            <div className={styles.heroActions}>
              <Link href="/book" className={styles.primaryBtn}>Book Your Stay</Link>
              <Link href="/gallery" className={styles.secondaryBtn}>View Gallery</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <span className={styles.label}>Brand Overview</span>
              <h2>Afro-Modern Comfort.<br />Kigali Energy. Private Peace.</h2>
              <p>
                Amahoro Luxury Villa  is for couples, families and friends to relax, and reconnect. 
                It offers private indoor/outdoor living, a rare find in Kigali. 
                Have a local chef prepare an outdoor barbecue or an intimate dinner in a spacious modern home 
                with views facing the hills of Kigali.
              </p>
              <Link href="/about" className={styles.textLink}>Our Story &rarr;</Link>
            </div>
            <div className={styles.highlights}>
              <div className={styles.highlightCard}>
                <h3>4 Bedrooms & 4 Baths</h3>
                <p>Spacious, elegant, and designed for ultimate privacy.</p>
              </div>
              <div className={styles.highlightCard}>
                <h3>Sunset Terraces</h3>
                <p>Two levels of outdoor living with breathtaking hill views.</p>
              </div>
              <div className={styles.highlightCard}>
                <h3>Tropical Garden</h3>
                <p>Fire pit and grill set in a lush, private oasis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Rooms Preview Section would go here */}
      
      <InstagramFeed />

      <section className={`${styles.ctaSection} section-padding`}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to experience  Amahoro Luxury Villa ?</h2>
            <p>Book your stay in Kigali&apos;s most peaceful luxury retreat.</p>
            <Link href="/book" className={styles.primaryBtn}>Check Availability</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
