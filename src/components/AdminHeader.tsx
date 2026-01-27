'use client';

import { usePathname } from 'next/navigation';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const pathname = usePathname();

  // Helper to get title from path (mocking a breadcrumb feel)
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview';
    if (pathname.includes('/bookings')) return 'Bookings';
    if (pathname.includes('/calendar')) return 'Calendar';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h2 className={styles.pageTitle}>{getPageTitle()}</h2>
        <span className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </div>
        
        <button className={styles.iconBtn} title="Notifications">
          🔔
          <span className={styles.badge}>2</span>
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin</span>
            <button onClick={async () => {
              try {
                await fetch('/api/admin/auth', { method: 'DELETE' });
                window.location.href = '/admin/login';
              } catch (err) { console.error(err); }
            }} className={styles.logoutLink}>Sign Out</button>
          </div>
        </div>
      </div>
    </header>
  );
}
