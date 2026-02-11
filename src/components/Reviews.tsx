import React from 'react';
import styles from './Reviews.module.css';
import { reviews } from './reviewsData';
import Link from 'next/link';
import Image from 'next/image';

const Reviews = () => {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.airbnbBadge}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={styles.badgeIcon} aria-hidden="true" role="presentation" focusable="false"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.726 4.692-.246 2.039-1.35 3.903-3.063 5.162C24.363 31.688 21.842 32 18.25 32c-3.528 0-6.059-.307-7.962-1.658-1.748-1.242-2.887-3.13-3.137-5.18l-.014-.242c-.171-1.428.058-2.92.652-4.464l.325-.769c1.066-2.486 5.253-11.2 7.135-14.832L16 3.73C16.927 2.083 17.514 1 16 1zm0 2c-.642 0-1.11.751-2.008 2.355l-.547 1.054c-1.921 3.765-6.082 12.476-7.067 14.773l-.151.365c-.563 1.465-.77 2.806-.607 4.161.206 1.688 1.139 3.238 2.57 4.256C9.9 31.144 12.15 31.39 15.65 31.397l.35.003h.126.125c4.78 0 7.375-.333 9.49-1.897 1.408-1.042 2.316-2.585 2.518-4.26.162-1.355-.045-2.696-.608-4.162l-.152-.366c-.984-2.296-5.145-11.006-7.066-14.771L19.924 4.88C18.995 3.233 18.536 2.49 18 2.146 17.657 1.926 17.15 1.838 16.5 1.927L16 2zm0 5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 2c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z"></path></svg>
            <span>Guest Favourite</span>
          </div>
          <h2 className={styles.title}>Loved by Travelers</h2>
          <p className={styles.subtitle}>
            Rated <strong>5.0/5</strong> on Airbnb. See what our guests have to say about their stay at Amahoro Luxury Villa.
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.userInfo}>
                <Image
                  src={review.image}
                  alt={review.name}
                  width={48}
                  height={48}
                  className={styles.avatar}
                />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{review.name}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
              </div>
              <div className={styles.stars}>
                {'★'.repeat(review.rating)}
              </div>
              <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className={styles.sourceLink}>
          <a
            href="https://www.airbnb.co.za/rooms/1446485293192029182?source_impression_id=p3_1768820276_P3IfJEcaCRXBsYVI"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllBtn}
          >
            Read all reviews on Airbnb
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
