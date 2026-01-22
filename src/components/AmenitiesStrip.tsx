import React from 'react';
import styles from './AmenitiesStrip.module.css';

const amenities = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    label: 'Fast Wifi'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: '24/7 Security'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM12 8v8M8 12h8" />
        <path d="M15 16s1 2 2 2 2-2 2-2" />
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M12 3v18" />
      </svg>
    ),
    label: 'Garden & Firepit'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h.01" />
        <path d="M10 15h8" />
      </svg>
    ),
    label: 'Private Parking'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
        <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
    label: 'Chef Available'
  }
];

const AmenitiesStrip = () => {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.scrollContainer}>
          <div className={styles.grid}>
            {amenities.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <span className={styles.label}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesStrip;
