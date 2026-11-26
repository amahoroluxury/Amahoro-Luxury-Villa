import Link from 'next/link';
import styles from './page.module.css';
import InstagramFeed from '@/components/InstagramFeed';
import GuestFavoriteReview from '@/components/GuestFavoriteReview';
import FeaturedSpaces from '@/components/FeaturedSpaces';
import MapPreview from '@/components/MapPreview';
import VisualTour from '@/components/VisualTour';
import Image from 'next/image';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Amahoro Luxury Villa",
    "description": "Amahoro Luxury Villa — A private sanctuary of peace in Kigali. Experience Afro-Modern luxury with 4 bedrooms, tropical garden, and world-class hospitality.",
    "url": "https://www.amahoroluxuryvilla.com",
    "telephone": "+250781871487",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KG 123 St",
      "addressLocality": "Kibagabaga, Kigali",
      "addressRegion": "Kigali City",
      "addressCountry": "RW"
    },
    "image": "https://www.amahoroluxuryvilla.com/og-image.jpg",
    "priceRange": "$$$",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": "true" },
      { "@type": "LocationFeatureSpecification", "name": "Outdoor Kitchen", "value": "true" },
      { "@type": "LocationFeatureSpecification", "name": "4 Bedrooms", "value": "4" },
      { "@type": "LocationFeatureSpecification", "name": "Tropical Garden", "value": "true" },
      { "@type": "LocationFeatureSpecification", "name": "Security", "value": "true" }
    ]
  };

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/site/home-hero.webp"
          className={styles.videoBackground}
          src="/Amahoroluxury-video.mp4"
        />
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>A Sanctuary of Peace in the Heart of Kigali</h1>

            <div className={styles.specs}>
              <div className={styles.specItem}>4 Bedrooms</div>
              <div className={styles.specItem}>4 Baths</div>
              <div className={styles.specItem}>8 Guests</div>
            </div>

            <div className={styles.heroActions}>
              <div className={styles.priceCallout}>
                <span className={styles.price}>$200</span>
                <span className={styles.perNight}>/ night</span>
              </div>
              <Link href="/book" className={styles.primaryBtn}>Book Your Stay</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.introSection}>
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
            <div className={styles.introPhotos}>
              <VisualTour />
            </div>
          </div>
        </div>
      </section>

      <FeaturedSpaces />

      <GuestFavoriteReview />

      <InstagramFeed />

      <MapPreview />

      <section className={`${styles.ctaSection} section-padding`}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to experience Amahoro Luxury Villa?</h2>
            <p>Book your stay <strong>$200 / night</strong> in Kigali&apos;s most peaceful luxury retreat.</p>
            <Link href="/book" className={styles.primaryBtn}>Check Availability</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
