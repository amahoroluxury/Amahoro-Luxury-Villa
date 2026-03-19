import React from 'react';
import styles from './GuestFavoriteReview.module.css';

const GuestFavoriteReview = () => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* Guest Favorite Badge */}
        <div className={styles.badgeColumn}>
          <svg
            className={`${styles.laurelIcon} ${styles.flipped}`}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16.955 7.006c1.396 3.12 4.102 5.565 7.373 6.666l.24.08-.236.09a10.957 10.957 0 0 0-6.262 6.64l-.08.24-.09-.236a10.957 10.957 0 0 0-6.64-6.262l-.24-.08.236-.09a10.957 10.957 0 0 0 6.262-6.64l.08-.24zM11.64 16.92A12.95 12.95 0 0 1 5.093 25.107l-.244.116.223.118a8.948 8.948 0 0 1 4.545 6.746l.044.276.046-.271a8.97 8.97 0 0 1 3.55-5.594l.192-.128-.216-.076a12.964 12.964 0 0 1-8.156-8.527zM26.4 20.37a8.973 8.973 0 0 1 3.253 4.887l.07.288.069-.283a8.951 8.951 0 0 1 4.298-5.385l.23-.109-.25-.067a12.958 12.958 0 0 1-7.14-5.32l-.126-.201-.063.23a12.97 12.97 0 0 1-4.088 6.642l-.19.141zM28.093 3.966l.16.208a12.96 12.96 0 0 1 2.368 6.47l.024.281-.274-.066a8.956 8.956 0 0 1-5.69-3.832l-.145-.25.07.28a8.97 8.97 0 0 1 .536 7.427l-.096.264-.096-.264a8.973 8.973 0 0 1 .094-6.142l.067-.184-.188.077a12.946 12.946 0 0 1-7.23 1.348l-.28-.024.254-.117a12.967 12.967 0 0 1 10.218-4.755zM6.983 2.115l.21.157a12.966 12.966 0 0 1 4.3 9.408l.006.282-.258-.113a8.952 8.952 0 0 1-4.329-5.263l-.098-.276-.025.29a8.976 8.976 0 0 1-3.66 6.388l-.225.152.062-.265A8.972 8.972 0 0 1 4.542 6.94l.053-.188-.186.066a12.957 12.957 0 0 1-7.07 1.096l-.28-.023.275-.054a12.966 12.966 0 0 1 9.44-5.38l.208-.005z" fill="currentColor"></path>
          </svg>
          <div className={styles.badgeText}>
            <span className={styles.guestLabel}>Guest</span>
            <span className={styles.guestLabel}>favorite</span>
          </div>
          <svg
            className={styles.laurelIcon}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16.955 7.006c1.396 3.12 4.102 5.565 7.373 6.666l.24.08-.236.09a10.957 10.957 0 0 0-6.262 6.64l-.08.24-.09-.236a10.957 10.957 0 0 0-6.64-6.262l-.24-.08.236-.09a10.957 10.957 0 0 0 6.262-6.64l.08-.24zM11.64 16.92A12.95 12.95 0 0 1 5.093 25.107l-.244.116.223.118a8.948 8.948 0 0 1 4.545 6.746l.044.276.046-.271a8.97 8.97 0 0 1 3.55-5.594l.192-.128-.216-.076a12.964 12.964 0 0 1-8.156-8.527zM26.4 20.37a8.973 8.973 0 0 1 3.253 4.887l.07.288.069-.283a8.951 8.951 0 0 1 4.298-5.385l.23-.109-.25-.067a12.958 12.958 0 0 1-7.14-5.32l-.126-.201-.063.23a12.97 12.97 0 0 1-4.088 6.642l-.19.141zM28.093 3.966l.16.208a12.96 12.96 0 0 1 2.368 6.47l.024.281-.274-.066a8.956 8.956 0 0 1-5.69-3.832l-.145-.25.07.28a8.97 8.97 0 0 1 .536 7.427l-.096.264-.096-.264a8.973 8.973 0 0 1 .094-6.142l.067-.184-.188.077a12.946 12.946 0 0 1-7.23 1.348l-.28-.024.254-.117a12.967 12.967 0 0 1 10.218-4.755zM6.983 2.115l.21.157a12.966 12.966 0 0 1 4.3 9.408l.006.282-.258-.113a8.952 8.952 0 0 1-4.329-5.263l-.098-.276-.025.29a8.976 8.976 0 0 1-3.66 6.388l-.225.152.062-.265A8.972 8.972 0 0 1 4.542 6.94l.053-.188-.186.066a12.957 12.957 0 0 1-7.07 1.096l-.28-.023.275-.054a12.966 12.966 0 0 1 9.44-5.38l.208-.005z" fill="currentColor"></path>
          </svg>
        </div>

        {/* Separator */}
        <div className={styles.separator}></div>

        {/* Review Text */}
        <div className={styles.reviewColumn}>
          <p className={styles.reviewText}>
            &ldquo;Excellent Villa, well maintained, and great experience. It is really a 5 Star accommodation. Good for big families or friends. Has a beautiful garden. Small shop across the road. Definitely will stay again. Thanks for Toby to make this accommodation available.&rdquo;
          </p>
          <span className={styles.reviewer}>&mdash; Sabir, October 2025</span>
        </div>

        {/* Separator */}
        <div className={styles.separator}></div>

        {/* Rating */}
        <div className={styles.ratingColumn}>
          <span className={styles.ratingValue}>5.0</span>
          <div className={styles.stars}>★★★★★</div>
          <a
            href="https://www.airbnb.co.za/rooms/1446485293192029182"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.reviewLink}
          >
            6 Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuestFavoriteReview;
