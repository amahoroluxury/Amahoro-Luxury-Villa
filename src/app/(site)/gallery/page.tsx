'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';

const categories = ['All', 'Master Suite', 'Bedrooms', 'Living & Dining', 'Kitchen', 'Terraces & Garden'];

const galleryImages = [
  { url: '/images/gallery/gallery-1.png', category: 'Terraces & Garden', span: 'wide' }, // Villa Exterior
  { url: '/images/gallery/gallery-18.jpg', category: 'Terraces & Garden', span: 'tall' }, // Exterior
  { url: '/images/gallery/gallery-4.jpg', category: 'Living & Dining', span: 'wide' }, // Living Room
  { url: '/images/gallery/gallery-19.jpg', category: 'Living & Dining', span: 'wide' }, // Home Theater
  { url: '/images/gallery/gallery-6.jpg', category: 'Living & Dining', span: 'tall' }, // Dining Area
  { url: '/images/gallery/gallery-5.jpg', category: 'Kitchen', span: 'normal' }, // Modern Kitchen
  { url: '/images/gallery/gallery-20.jpg', category: 'Living & Dining', span: 'normal' }, // Villa Details
  { url: '/images/gallery/gallery-7.jpg', category: 'Master Suite', span: 'normal' }, // Master Bedroom
  { url: '/images/gallery/gallery-8.jpg', category: 'Bedrooms', span: 'wide' }, // Guest Room
  { url: '/images/gallery/gallery-9.png', category: 'Bedrooms', span: 'normal' }, // Bedroom Suite
  { url: '/images/gallery/gallery-3.jpg', category: 'Bedrooms', span: 'normal' }, // Cozy Bedroom
  { url: '/images/gallery/gallery-10.png', category: 'Bedrooms', span: 'tall' }, // Luxury Bathroom (categorized with bedrooms/suites)
  { url: '/images/gallery/gallery-11.jpg', category: 'Bedrooms', span: 'normal' }, // Bathroom Details
  { url: '/images/gallery/gallery-14.jpg', category: 'Terraces & Garden', span: 'wide' }, // Backyard Oasis
  { url: '/images/gallery/gallery-2.jpg', category: 'Terraces & Garden', span: 'normal' }, // Garden View
  { url: '/images/gallery/gallery-16.jpg', category: 'Terraces & Garden', span: 'tall' }, // Outdoor Terrace
  { url: '/images/gallery/gallery-15.jpg', category: 'Terraces & Garden', span: 'normal' }, // Sunset Balcony
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.label}>Visual Experience</span>
          <h1>A glimpse into your Kigali retreat</h1>
          <p className={styles.lead}>
            Explore the villa’s spaces—from bright interiors to sunset terraces and the tropical garden.
          </p>

          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.activeTab : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className={styles.masonryGrid}>
            {filteredImages.map((img, index) => (
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
