'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: '📊' },
    { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
    { label: 'Calendar', href: '/admin/calendar', icon: '🗓️' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      if (res.ok) {
        window.location.href = '/admin/login';
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Link href="/admin">
          <Logo height={35} className={styles.logo} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <span className={styles.sectionTitle}>Main Menu</span>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.mainSiteLink}>
          <span>🏠</span>
          <span>Main Site</span>
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
        <div className={styles.statusIndicator}>
          <div className={styles.dot}></div>
          <span className={styles.statusText}>Live Tracking</span>
        </div>
      </div>
    </aside>
  );
}
