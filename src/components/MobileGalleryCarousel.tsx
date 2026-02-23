'use client';

import React from 'react';
import Image from 'next/image';
import styles from './MobileGalleryCarousel.module.css';

const images = [
    { src: '/images/gallery/master-suite.jpg', title: 'Master Sanctuary' },
    { src: '/images/gallery/Living Room.jpg', title: 'Elegant Living' },
    { src: '/images/gallery/FIRE PIT.jpg', title: 'Zen Fire Pit' },
    { src: '/images/gallery/TROPICAL GARDEN.jpg', title: 'Lush Gardens' },
    { src: '/images/gallery/CHEFS KITCHEN.jpg', title: 'Chef\'s Paradise' },
    { src: '/images/gallery/OUTDOOR BARBECUE.jpeg', title: 'Al Fresco Dining' },
    { src: '/images/gallery/movie-room.png', title: 'Private Cinema' }
];

const MobileGalleryCarousel = () => {
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.header}>
                <span className={styles.label}>Visual Tour</span>
                <h2 className={styles.title}>Vivid Moments</h2>
            </div>
            <div className={styles.scrollArea}>
                {images.map((img, index) => (
                    <div key={index} className={styles.item}>
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className={styles.image}
                            sizes="85vw"
                        />
                        <div className={styles.itemCaption}>{img.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileGalleryCarousel;
