'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './VisualTour.module.css';

const images = [
    { src: '/images/gallery/gallery-4.jpg', title: 'Villa Exterior' },
    { src: '/images/gallery/Living Room.jpg', title: 'Elegant Living Room' },
    { src: '/images/gallery/CHEFS KITCHEN.jpg', title: 'Gourmet Kitchen' },
    { src: '/images/gallery/TROPICAL GARDEN.jpg', title: 'Tropical Garden' },
    { src: '/images/gallery/master-suite.jpg', title: 'Master Suite' },
];

const VisualTour = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.tourWrapper}>
            <div className={styles.header}>
                <span className={styles.label}>Visual Tour</span>
                <h2 className={styles.title}>Swipe to Explore</h2>
            </div>
            <div className={styles.scrollContainer} ref={scrollRef}>
                {images.map((img, index) => (
                    <div key={index} className={styles.slide}>
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className={styles.image}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={styles.caption}>{img.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VisualTour;
