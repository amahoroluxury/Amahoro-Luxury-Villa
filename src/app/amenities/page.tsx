import Link from 'next/link';
import { Wifi, Tv, Coffee, Utensils, Shield, Car, Wind, User } from 'lucide-react';
import styles from './amenities.module.css';

const amenities = [
  { icon: <Wifi size={32} />, name: 'High-speed Fiber WiFi', description: 'Stay connected with reliable, fast internet throughout the villa.' },
  { icon: <Utensils size={32} />, name: 'Chef-grade Kitchen', description: 'Full kitchen equipped with premium appliances for all your culinary needs.' },
  { icon: <Coffee size={32} />, name: 'Espresso Coffee Bar', description: 'Start your mornings with professional-grade coffee from our bar.' },
  { icon: <Tv size={32} />, name: 'Smart TVs', description: 'Enjoy your favorite shows on large smart TVs in living areas.' },
  { icon: <Car size={32} />, name: 'On-site Parking', description: 'Secure, private parking for multiple vehicles.' },
  { icon: <Shield size={32} />, name: 'Security System', description: 'Peace of mind with 24/7 security and an on-site house manager.' },
  { icon: <Wind size={32} />, name: 'Laundry Room', description: 'Dedicated laundry facilities for your convenience during longer stays.' },
  { icon: <User size={32} />, name: 'Optional Private Chef', description: 'Available on request to prepare local or international delicacies.' },
];

export default function AmenitiesPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Luxury Living</span>
          <h1>Everything you need for a seamless stay</h1>
          <p className={styles.lead}>
            Amahoro is designed for comfort, privacy, and elevated hospitality—indoors and out.
          </p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            {amenities.map((item) => (
              <div key={item.name} className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.outdoor} section-padding`}>
        <div className="container">
          <div className={styles.outdoorContent}>
            <div className={styles.outdoorText}>
              <h2>Outdoor living, refined</h2>
              <p>
                Experience the rare luxury of private indoor-outdoor living in Kigali. 
                Our tropical garden, fire pit, and alfresco dining areas are perfect for sunset moments.
              </p>
              <ul className={styles.outdoorList}>
                <li>Two levels of terraces with hill views</li>
                <li>Outdoor kitchen with grill</li>
                <li>Lush tropical garden setting</li>
                <li>Evening fire pit</li>
              </ul>
            </div>
            <div className={styles.outdoorImage}>
              {/* Image of fire pit/garden */}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h3>Ready to experience Amahoro?</h3>
            <Link href="/book" className={styles.primaryBtn}>Book Your Stay</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
