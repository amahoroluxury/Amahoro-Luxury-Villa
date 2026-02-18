import Link from 'next/link';
import { MapPin, Plane, Building2, Landmark } from 'lucide-react';
import { Metadata } from 'next';
import styles from './location.module.css';

export const metadata: Metadata = {
  title: 'Location',
  description: 'Stay in the heart of Kibagabaga, Kigali’s most upscale neighborhood. Minutes away from the airport, convention centre, and top-rated restaurants.',
};

const highlights = [
  { icon: <Plane size={24} />, name: 'Kigali International Airport', distance: '15 Minutes' },
  { icon: <Building2 size={24} />, name: 'Kigali Convention Centre', distance: '12 Minutes' },
  { icon: <Landmark size={24} />, name: 'Kigali City Center', distance: '18 Minutes' },
];

export default function LocationPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>The Neighborhood</span>
          <h1>Stay close to everything—without the noise</h1>
          <p className={styles.lead}>
            Located in the upscale community of Kibagabaga,  Amahoro Luxury Villa  is surrounded by top-rated restaurants, gyms, pharmacies, and hospitals.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.mapSection}>
            <div className={styles.mapPlaceholder}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.124857!3d-1.931113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTUnNTIuMCJTIDMwwrAwNyczMC4zIkU!5e0!3m2!1sen!2srw!4v1"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amahoro Luxury Villa Location"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.highlightsSection} section-padding`}>
        <div className="container">
          <div className={styles.highlightsGrid}>
            <div className={styles.info}>
              <h2>Prime Location in Kibagabaga</h2>
              <p>
                Amahoro Luxury Villa  offers the perfect balance of serenity and accessibility.
                Whether you’re here for business or leisure, you’ll find everything you need within minutes.
              </p>
              <ul className={styles.localLinks}>
                <li>Top-rated café & restaurants</li>
                <li>Premium gyms & wellness centers</li>
                <li>Hospitals & pharmacies</li>
                <li>Supermarkets & banks</li>
              </ul>
              <a
                href="https://maps.google.com/?q=-1.931113,30.124857"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                Get Directions
              </a>
            </div>
            <div className={styles.distances}>
              {highlights.map((item) => (
                <div key={item.name} className={styles.distanceCard}>
                  <div className={styles.icon}>{item.icon}</div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
