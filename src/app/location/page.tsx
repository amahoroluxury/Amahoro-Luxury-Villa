import Link from 'next/link';
import { MapPin, Plane, Building2, Landmark } from 'lucide-react';
import styles from './location.module.css';

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
              {/* Google Map Embed would go here */}
              <div className={styles.mapOverlay}>
                <MapPin size={48} color="var(--primary)" />
                <p>Kibagabaga, Kigali, Rwanda</p>
              </div>
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
                href="https://maps.google.com" 
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
