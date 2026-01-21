import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>AMAHORO</h2>
            <p className={styles.tagline}>A Sanctuary of Peace in the Heart of Kigali.</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h3>Explore</h3>
              <Link href="/">Home</Link>
              <Link href="/rooms">Rooms</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/book">Book Now</Link>
            </div>
            
            <div className={styles.column}>
              <h3>Contact</h3>
              <p>+250 781 871 487</p>
              <p>booking@amahoroluxury.com</p>
              <div className={styles.socials}>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>

            <div className={styles.column}>
              <h3>Partners</h3>
              <Link href="#">Tours</Link>
              <Link href="#">Real Estate</Link>
              <Link href="#">Courses</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()}  Amahoro Luxury Villa . All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/policies">Policies</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
