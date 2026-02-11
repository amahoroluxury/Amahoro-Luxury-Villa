import Link from 'next/link';
import styles from './page.module.css';
import InstagramFeed from '@/components/InstagramFeed';
import GuestFavoriteBanner from '@/components/GuestFavoriteBanner';
import FeaturedSpaces from '@/components/FeaturedSpaces';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import AmenitiesStrip from '@/components/AmenitiesStrip';
import MapPreview from '@/components/MapPreview';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/og-image.jpg"
          className={styles.videoBackground}
          src="/Amahoroluxury-video.mp4"
        />
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>A Sanctuary of Peace in the Heart of Kigali</h1>
            <p className={styles.subtitle}>Amahoro means peace. Experience Afro-Modern luxury and unforgettable hospitality.</p>

            <div className={styles.specs}>
              <div className={styles.specItem}>4 Bedrooms</div>
              <div className={styles.specItem}>4 Baths</div>
              <div className={styles.specItem}>8 Guests</div>
            </div>

            <div className={styles.heroActions}>
              <Link href="/book" className={styles.primaryBtn}>Book Your Stay</Link>
              <Link href="/amenities" className={styles.secondaryBtn}>View Amenities</Link>
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
                Amahoro Luxury Villa is for couples, families and friends to relax, and reconnect.
                It offers private indoor/outdoor living, a rare find in Kigali.
                Enjoy our fully stocked chef&apos;s kitchen or relax in the tropical garden featuring a full outdoor kitchen with BBQ grill and zen water fountain.
              </p>
              <Link href="/about" className={styles.textLink}>Our Story &rarr;</Link>
            </div>
            <div className={styles.highlights}>
              <div className={styles.highlightCard}>
                <h3>4 Bedrooms & 4 en-suite Baths</h3>
                <p>Spacious, elegant, and designed for ultimate privacy.</p>
              </div>
              <div className={styles.highlightCard}>
                <h3>Tropical Garden</h3>
                <p>Full outdoor kitchen, BBQ grill, and zen water fountain.</p>
              </div>
              <div className={styles.highlightCard}>
                <h3>Stocked Chef&apos;s Kitchen</h3>
                <p>High-end appliances and everything needed for culinary excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AmenitiesStrip />

      <FeaturedSpaces />

      <GuestFavoriteBanner />
      <TestimonialsCarousel />

      <InstagramFeed />

      <MapPreview />

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
