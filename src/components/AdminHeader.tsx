'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper to get title from path (mocking a breadcrumb feel)
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview';
    if (pathname.includes('/bookings')) return 'Bookings';
    if (pathname.includes('/calendar')) return 'Calendar';
    if (pathname.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (err) {
      console.error(err);
    }
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
        
        <div className={styles.userProfileWrapper}>
          <button 
            className={styles.userProfile}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen ? "true" : "false"}
            aria-haspopup="true"
          >
            <div className={styles.avatar}>A</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Admin</span>
              <span className={styles.userRole}>Administrator</span>
            </div>
            <span className={styles.dropdownIcon}>{dropdownOpen ? '▲' : '▼'}</span>
          </button>
          
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
