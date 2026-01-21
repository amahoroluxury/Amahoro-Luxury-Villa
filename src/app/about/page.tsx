import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}> Amahoro Luxury Villa  means Peace</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainStory}>
              <span className={styles.label}>Our Story</span>
              <h2>A Sanctuary of Calm</h2>
              <p>
                 Amahoro Luxury Villa  means peace in Kinyarwanda. It embodies the spirit of calm that defines our villa. 
                We celebrate Rwandan culture through the craftsmanship that went into building and furnishing the home.
              </p>
              <p>
                The space is intended to have the luxury feel of a 5-star hotel and the comfort and privacy of a home. 
                Our mission is to complement your stay with the level of service that will make your experience memorable.
              </p>
            </div>
            <div className={styles.sideContent}>
              <div className={styles.imagePlaceholder}>
                {/* Image of Afro-centric interior details */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.experience} section-padding`}>
        <div className="container">
          <div className={styles.expGrid}>
            <div className={styles.expImage}>
              {/* Image of building front elevation */}
            </div>
            <div className={styles.expText}>
              <h2>A home built for unforgettable moments</h2>
              <p>
                From morning coffee at the espresso bar to sunset dinners on the terrace, every space at  Amahoro Luxury Villa   
                is designed to feel warm, elegant, and effortless. Whether you’re hosting family, relaxing with friends, 
                or enjoying a quiet escape, the villa offers comfort you can truly settle into.
              </p>
              <Link href="/rooms" className={styles.primaryBtn}>View Rooms</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
