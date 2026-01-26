import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink}>
              <Logo height={80} theme="light" />
            </Link>
            <p className={styles.tagline}>A sanctuary of peace in the heart of Kigali, offering an unmatched blend of luxury, comfort, and serenity.</p>
            
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="mailto:booking@amahoro.com" className={styles.socialIcon} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Explore Column */}
          <div className={styles.column}>
            <h3>Explore</h3>
            <Link href="/">Home</Link>
            <Link href="/rooms">Accommodation</Link>
            <Link href="/amenities">Amenities</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/location">Location</Link>
          </div>

          {/* Company Column */}
          <div className={styles.column}>
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/reviews">Guest Reviews</Link>
            <Link href="/book">Book Now</Link>
          </div>
          
          {/* Contact Column */}
          <div className={styles.column}>
            <h3>Contact Us</h3>
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} />
              <span>
                KG 123 St, Kigali<br />
                Rwanda
              </span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <span>+250 781 871 487</span>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} />
              <span>booking@amahoro.com</span>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Amahoro Luxury Villa. All rights reserved.</p>
          
          <div className={styles.legal}>
            <Link href="/policies">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>

          <p className={styles.developer}>
            <a href="https://getrwanda.rw/" target="_blank" rel="noopener noreferrer">
              Built by #TeamGet
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
