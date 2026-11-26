'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './VisualTour.module.css';

const images = [
    { src: '/images/site/home-tropical-garden-terrace.webp', title: 'Tropical Garden Terrace' },
    { src: '/images/gallery/Living Room.jpg', title: 'Elegant Living Room' },
    { src: '/images/site/home-chefs-kitchen.webp', title: 'Gourmet Kitchen' },
    { src: '/images/gallery/master-suite.jpg', title: 'Master Suite' },
    { src: '/images/gallery/gallery-4.jpg', title: 'Modern Exterior' },
    { src: '/images/gallery/TERRACE VIEWS.jpeg', title: 'Stunning Terrace Views' },
    { src: '/images/site/home-fire-pit.webp', title: 'Zen Fire Pit' },
    { src: '/images/site/home-outdoor-kitchen.webp', title: 'Outdoor Kitchen' },
];

const VisualTour = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const lightboxPrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    };

    const lightboxNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.tourWrapper}>
            <button className={`${styles.navButton} ${styles.prevButton}`} onClick={scrollLeft} aria-label="Previous image">
                ‹
            </button>
            <button className={`${styles.navButton} ${styles.nextButton}`} onClick={scrollRight} aria-label="Next image">
                ›
            </button>
            <div className={styles.scrollContainer} ref={scrollRef}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={styles.slide}
                        onClick={() => openLightbox(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                    >
                        {/* Blurred copy fills the frame so the full photo can sit on top uncropped */}
                        <Image
                            src={img.src}
                            alt=""
                            aria-hidden
                            fill
                            className={styles.backdrop}
                            sizes="10vw"
                        />
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className={styles.image}
                            sizes="(max-width: 1024px) 100vw, 1200px"
                        />
                        <div className={styles.caption}>{img.title}</div>
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
                                sizes="90vw"
                                priority
                            />
                        </div>
                        <button className={styles.lightboxNext} onClick={lightboxNext} aria-label="Next">
                            ›
                        </button>
                        <div className={styles.lightboxCaption}>
                            {images[lightboxIndex].title}
                            <span className={styles.lightboxCount}>
                                {lightboxIndex + 1} / {images.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualTour;
