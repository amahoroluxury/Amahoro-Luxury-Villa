'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MobileGalleryCarousel.module.css';

const images = [
    { src: '/images/gallery/TROPICAL GARDEN.jpg', title: 'Tropical Garden' },
    { src: '/images/gallery/master-suite.jpg', title: 'Master Suite' },
    { src: '/images/gallery/Living Room.jpg', title: 'Elegant Living Room' },
    { src: '/images/gallery/FIRE PIT.jpg', title: 'Zen Fire Pit' },
    { src: '/images/gallery/CHEFS KITCHEN.jpg', title: "Chef's Kitchen" },
    { src: '/images/gallery/OUTDOOR BARBECUE.jpeg', title: 'Outdoor Barbecue' },
    { src: '/images/gallery/movie-room.png', title: 'Private Cinema' },
    { src: '/images/gallery/TERRACE VIEWS.jpeg', title: 'Terrace Views' },
    { src: '/images/gallery/gallery-4.jpg', title: 'Villa Exterior' },
    { src: '/images/gallery/gallery-2.jpg', title: 'Villa Interior' },
    { src: '/images/gallery/gallery-3.jpg', title: 'Villa Details' },
    { src: '/images/gallery/gallery-7.jpg', title: 'Living Spaces' },
    { src: '/images/gallery/gallery-11.jpg', title: 'Garden Path' },
    { src: '/images/gallery/gallery-15.jpg', title: 'Patio Area' },
    { src: '/images/gallery/gallery-16.jpg', title: 'Dining Area' },
    { src: '/images/gallery/gallery-17.jpg', title: 'Sunset View' },
    { src: '/images/gallery/Bed Rooms page/MASTER SUITE.jpg', title: 'Master Bedroom' },
    { src: '/images/gallery/Bed Rooms page/2nd-bedroom.jpg', title: 'Second Bedroom' },
    { src: '/images/gallery/Bed Rooms page/3rd bedrooms.png', title: 'Third Bedroom' },
    { src: '/images/gallery/Bed Rooms page/4TH BEDROOM.jpeg', title: 'Fourth Bedroom' },
];

const MobileGalleryCarousel = () => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const lightboxPrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    };
    const lightboxNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.header}>
                <span className={styles.label}>Visual Tour</span>
                <h2 className={styles.title}>Swipe to Explore</h2>
            </div>
            <div className={styles.scrollArea}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        onClick={() => openLightbox(index)}
                        role="button"
                        tabIndex={0}
                    >
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 95vw, (max-width: 1024px) 45vw, 30vw"
                        />
                        <div className={styles.itemCaption}>{img.title}</div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className={styles.lightboxOverlay} onClick={closeLightbox}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
                            ✕
                        </button>
                        <button className={styles.lightboxPrev} onClick={lightboxPrev} aria-label="Previous">
                            ‹
                        </button>
                        <div className={styles.lightboxImageWrapper}>
                            <Image
                                src={images[lightboxIndex].src}
                                alt={images[lightboxIndex].title}
                                fill
                                className={styles.lightboxImage}
                                sizes="95vw"
                                priority
                            />
                        </div>
                        <button className={styles.lightboxNext} onClick={lightboxNext} aria-label="Next">
                            ›
                        </button>
                        <div className={styles.lightboxCaption}>
                            {images[lightboxIndex].title}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileGalleryCarousel;
