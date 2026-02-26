'use client';

import React from 'react';
import Image from 'next/image';
import styles from './MobileGalleryCarousel.module.css';

const images = [
    { src: '/images/gallery/master-suite.jpg', title: 'Master Suite' },
    { src: '/images/gallery/Living Room.jpg', title: 'Elegant Living Room' },
    { src: '/images/gallery/FIRE PIT.jpg', title: 'Zen Fire Pit' },
    { src: '/images/gallery/TROPICAL GARDEN.jpg', title: 'Tropical Garden' },
    { src: '/images/gallery/CHEFS KITCHEN.jpg', title: "Chef's Kitchen" },
    { src: '/images/gallery/OUTDOOR BARBECUE.jpeg', title: 'Outdoor Barbecue' },
    { src: '/images/gallery/movie-room.png', title: 'Private Cinema' },
    { src: '/images/gallery/TERRACE VIEWS.jpeg', title: 'Terrace Views' },
    { src: '/images/gallery/gallery-2.jpg', title: 'Villa Interior' },
    { src: '/images/gallery/gallery-3.jpg', title: 'Villa Details' },
    { src: '/images/gallery/gallery-4.jpg', title: 'Villa Exterior' },
    { src: '/images/gallery/gallery-7.jpg', title: 'Living Spaces' },
    { src: '/images/gallery/gallery-8.jpg', title: 'Cozy Corner' },
    { src: '/images/gallery/gallery-9.png', title: 'Villa View' },
    { src: '/images/gallery/gallery-10.png', title: 'Relaxation Area' },
    { src: '/images/gallery/gallery-11.jpg', title: 'Garden Path' },
    { src: '/images/gallery/gallery-12.jpg', title: 'Evening Ambiance' },
    { src: '/images/gallery/gallery-13.jpg', title: 'Outdoor Lounge' },
    { src: '/images/gallery/gallery-15.jpg', title: 'Pool & Patio' },
    { src: '/images/gallery/gallery-16.jpg', title: 'Dining Area' },
    { src: '/images/gallery/gallery-17.jpg', title: 'Sunset View' },
    { src: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg', title: 'Master Bedroom' },
    { src: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg', title: 'Second Bedroom' },
    { src: '/images/gallery/Bed Rooms page/3rd bedrooms.png', title: 'Third Bedroom' },
    { src: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg', title: 'Fourth Bedroom' },
];

const MobileGalleryCarousel = () => {
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.header}>
                <span className={styles.label}>Visual Tour</span>
                <h2 className={styles.title}>Swipe to Explore</h2>
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
