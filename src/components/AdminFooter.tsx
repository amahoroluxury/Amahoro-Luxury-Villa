'use client';

import styles from './AdminFooter.module.css';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="admin-container">
        <div className={styles.content}>
          <div className={styles.left}>
            <p>&copy; {currentYear} Amahoro Luxury Villa. Admin Portal.</p>
          </div>
          <div className={styles.right}>
            <p>Developed by <a href="https://getrwanda.rw" target="_blank" rel="noopener noreferrer" className={styles.link}>#TeamGet</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
