import Image from 'next/image';
import styles from './InstagramFeed.module.css';

const INSTAGRAM_URL = "https://www.instagram.com/amahoro_luxury_villa_rw";

// Placeholder images from the gallery to simulate a feed
const FEED_ITEMS = [
  { id: 1, src: '/images/site/instagram-1-dining.webp', alt: 'Dining room with valley views' },
  { id: 2, src: '/images/gallery/gallery-5.jpeg', alt: 'Relaxing Interior' },
  { id: 3, src: '/images/site/instagram-2-entrance.webp', alt: 'Villa entrance' },
  { id: 4, src: '/images/site/instagram-4-balcony.webp', alt: 'Relaxing on the balcony' },
  // Add more if we want 6 items for larger screens
];

export default function InstagramFeed() {
  return (
    <section className={`${styles.section} section-padding`}>
      <div className="container">
        <h2 className={styles.title}>
          Follow Us on Instagram
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.handle}>
            @amahoro_luxury_villa_rw
          </a>
        </h2>

        <div className={styles.grid}>
          {FEED_ITEMS.map((item) => (
            <a
              key={item.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
              <div className={styles.instagramOverlay}>
                <span>View on Instagram</span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.button}>
            Follow Us
          </a>
        </div>
      </div>
    </section>
  );
}
