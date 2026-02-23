'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PropertyCarousel.module.css';

const images = [
    {
        src: '/images/gallery/gallery-4.jpg',
        title: 'Modern Exterior',
    },
    {
        src: '/images/gallery/Living Room.jpg',
        title: 'Spacious Living Area',
    },
    {
        src: '/images/gallery/CHEFS KITCHEN.jpg',
        title: 'Gourmet Kitchen',
    },
    {
        src: '/images/gallery/TROPICAL GARDEN.jpg',
        title: 'Lush Tropical Garden',
    },
    {
        src: '/images/gallery/TERRACE VIEWS.jpeg',
        title: 'Stunning Terrace Views',
    },
];

const PropertyCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className={styles.carouselSection}>
            <div className="container">
                <div className={styles.gridContainer}>
                    <div className={styles.header}>
                        <span className={styles.label}>Property Tour</span>
                        <h2 className={styles.title}>Experience Excellence</h2>
                    </div>

                    <div className={styles.carouselWrapper}>
                        <div className={styles.carouselMain}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className={styles.imageContainer}
                                >
                                    <Image
                                        src={images[currentIndex].src}
                                        alt={images[currentIndex].title}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        priority
                                    />
                                    <div className={styles.imageOverlay}>
                                        <p>{images[currentIndex].title}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <button onClick={handlePrev} className={styles.navBtn} aria-label="Previous image">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={handleNext} className={`${styles.navBtn} ${styles.next}`} aria-label="Next image">
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className={styles.dots}>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyCarousel;
