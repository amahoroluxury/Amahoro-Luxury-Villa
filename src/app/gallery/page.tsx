import styles from './gallery.module.css';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', category: 'Exterior', span: 'wide' },
  { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop', category: 'Living Room', span: 'tall' },
  { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop', category: 'Interiors', span: 'normal' },
  { url: 'https://images.unsplash.com/photo-1616594111350-47522466021a?q=80&w=2017&auto=format&fit=crop', category: 'Bedrooms', span: 'normal' },
  { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070&auto=format&fit=crop', category: 'Bedrooms', span: 'tall' },
  { url: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop', category: 'Garden', span: 'wide' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', category: 'Exterior', span: 'normal' },
  { url: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop', category: 'Bedrooms', span: 'normal' },
  { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop', category: 'Bedrooms', span: 'tall' },
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
                <div 
                  className={styles.img} 
                  style={{ '--bg-image': `url(${img.url})` } as React.CSSProperties}
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
