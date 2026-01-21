import Link from 'next/link';
import { Star } from 'lucide-react';
import styles from './reviews.module.css';

const reviews = [
  {
    name: 'Sarah Mitchell',
    location: 'United Kingdom',
    rating: 5,
    text: 'An absolute gem in Kigali. The villa is even more beautiful than the photos. The sunsets from the terrace were the highlight of our trip. Highly recommend the private chef!'
  },
  {
    name: 'Jean-Paul Habimana',
    location: 'Rwanda',
    rating: 5,
    text: 'The most peaceful stay I’ve had in Kibagabaga. Excellent attention to detail and Rwandan culture. It felt like a 5-star hotel with the privacy of a personal home.'
  },
  {
    name: 'David Omondi',
    location: 'Kenya',
    rating: 5,
    text: 'Perfect for business travelers who want space and quiet. The fiber WiFi was fast and reliable for all my video calls. Will definitely stay here again on my next visit.'
  },
  {
    name: 'Elena Rodriguez',
    location: 'Spain',
    rating: 5,
    text: 'The tropical garden is stunning. We hosted a small family dinner and the host manager was incredibly helpful with the arrangements. Truly a sanctuary of peace.'
  },
  {
    name: 'Marcus Williams',
    location: 'United States',
    rating: 5,
    text: ' Amahoro Luxury Villa  exceeded our expectations. Spacious, clean, and in a great location. Close to great restaurants but far enough from the noise to truly relax.'
  },
];

export default function ReviewsPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Testimonials</span>
          <h1>Trusted by guests from around the world</h1>
          <p className={styles.lead}>
            Our guests share their experiences of peace, luxury, and hospitality at  Amahoro Luxury Villa .
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.stars}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                  ))}
                </div>
                <p className={styles.reviewText}>&quot;{review.text}&quot;</p>
                <div className={styles.author}>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h3>Ready to create your own story at  Amahoro Luxury Villa ?</h3>
            <Link href="/book" className={styles.primaryBtn}>Check Availability</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
