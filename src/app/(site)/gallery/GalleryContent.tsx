'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';

const categories = ['All', 'Master Suite', 'Bedrooms', 'Living & Dining', 'Kitchen', 'Terraces & Garden'];

const galleryImages = [
    // Terraces & Garden
    { url: '/images/gallery/TROPICAL GARDEN.jpg', category: 'Terraces & Garden', span: 'tall' },
    { url: '/images/gallery/FIRE PIT.jpg', category: 'Terraces & Garden', span: 'normal' },
    { url: '/images/gallery/OUTDOOR BARBECUE.jpeg', category: 'Terraces & Garden', span: 'normal' },
    { url: '/images/gallery/TERRACE VIEWS.jpeg', category: 'Terraces & Garden', span: 'normal' },

    // Kitchen
    { url: '/images/gallery/CHEFS KITCHEN.jpg', category: 'Kitchen', span: 'tall' },

    // Living & Dining
    { url: '/images/gallery/Living Room.jpg', category: 'Living & Dining', span: 'normal' },

    // Master Suite
    { url: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg', category: 'Master Suite', span: 'normal' },

    // Bedrooms
    { url: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg', category: 'Bedrooms', span: 'tall' },
    { url: '/images/gallery/Bed Rooms page/3rd bedrooms.png', category: 'Bedrooms', span: 'tall' },
    { url: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg', category: 'Bedrooms', span: 'normal' },

    // Additional variety from existing images (optional but adds depth)
    { url: '/images/gallery/gallery-10.png', category: 'Bedrooms', span: 'tall' },
    { url: '/images/gallery/gallery-11.jpg', category: 'Bedrooms', span: 'tall' },
];

export default function GalleryContent() {
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
