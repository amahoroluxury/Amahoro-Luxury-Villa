import React from 'react';
import styles from './MapPreview.module.css';

const MapPreview = () => {
  return (
    <section className={styles.mapSection}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <span className={styles.label}>Location</span>
            <h2 className={styles.title}>Peaceful Kibagabaga, Kigali</h2>
            <p className={styles.text}>
              Perched on the hills with panoramic valley views.
              Just 15 minutes from the city center. <strong>Luxury stays from $200 / night.</strong>
            </p>
            <a
              href="https://maps.google.com/?q=-1.931113,30.124857"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLinkBtn}
            >
              Get Directions
            </a>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.124857!3d-1.931113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTUnNTIuMCJTIDMwwrAwNyczMC4zIkU!5e0!3m2!1sen!2srw!4v1"
              width="100%"
              height="100%"
              className={styles.iframe}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amahoro Luxury Villa Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
