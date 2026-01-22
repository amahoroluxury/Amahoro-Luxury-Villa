import Image from 'next/image';
import styles from './gallery.module.css';

const galleryImages = [
  { url: '/images/gallery/gallery-1.png', category: 'Villa Exterior', span: 'wide' },
  { url: '/images/gallery/gallery-18.jpg', category: 'Exterior', span: 'tall' },
  { url: '/images/gallery/gallery-4.jpg', category: 'Living Room', span: 'wide' },
  { url: '/images/gallery/gallery-19.jpg', category: 'Home Theater', span: 'wide' },
  { url: '/images/gallery/gallery-6.jpg', category: 'Dining Area', span: 'tall' },
  { url: '/images/gallery/gallery-5.jpg', category: 'Modern Kitchen', span: 'normal' },
  { url: '/images/gallery/gallery-20.jpg', category: 'Villa Details', span: 'normal' },
  { url: '/images/gallery/gallery-7.jpg', category: 'Master Bedroom', span: 'normal' },
  { url: '/images/gallery/gallery-8.jpg', category: 'Guest Room', span: 'wide' },
  { url: '/images/gallery/gallery-9.png', category: 'Bedroom Suite', span: 'normal' },
  { url: '/images/gallery/gallery-3.jpg', category: 'Cozy Bedroom', span: 'normal' },
  { url: '/images/gallery/gallery-10.png', category: 'Luxury Bathroom', span: 'tall' },
  { url: '/images/gallery/gallery-11.jpg', category: 'Bathroom Details', span: 'normal' },
  { url: '/images/gallery/gallery-14.jpg', category: 'Backyard Oasis', span: 'wide' },
  { url: '/images/gallery/gallery-2.jpg', category: 'Garden View', span: 'normal' },
  { url: '/images/gallery/gallery-16.jpg', category: 'Outdoor Terrace', span: 'tall' },
  { url: '/images/gallery/gallery-15.jpg', category: 'Sunset Balcony', span: 'normal' },
];

export default function GalleryPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Visual Experience</span>
          <h1>A glimpse into your Kigali retreat</h1>
          <p className={styles.lead}>
            Explore the villa’s spaces—from bright interiors to sunset terraces and the tropical garden.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.masonryGrid}>
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`${styles.masonryItem} ${styles[img.span]}`}
              >
                <Image 
                  src={img.url} 
                  alt={img.category}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.img}
                />
                <div className={styles.overlay}>
                  <span>{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
