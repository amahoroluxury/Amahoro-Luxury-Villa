'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './TestimonialsCarousel.module.css';
import { reviews } from './reviewsData';

const TestimonialsCarousel = () => {
  // Use first 3 reviews for the carousel
  const featuredReviews = reviews.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselContent}>
        <div className={styles.reviewCard}>
          <div className={styles.quoteIcon}>“</div>
          <p className={styles.reviewText}>{featuredReviews[activeIndex].text}</p>
          
          <div className={styles.reviewerInfo}>
            <div className={styles.avatarWrapper}>
              <Image 
                src={featuredReviews[activeIndex].image} 
                alt={featuredReviews[activeIndex].name} 
                width={50} 
                height={50} 
                className={styles.avatar} 
              />
            </div>
            <div className={styles.meta}>
              <span className={styles.name}>{featuredReviews[activeIndex].name}</span>
              <span className={styles.date}>{featuredReviews[activeIndex].date}</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={prevReview} className={styles.controlBtn} aria-label="Previous review">
            ←
          </button>
          <div className={styles.indicators}>
            {featuredReviews.map((_, idx) => (
              <span 
                key={idx} 
                className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
          <button onClick={nextReview} className={styles.controlBtn} aria-label="Next review">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
