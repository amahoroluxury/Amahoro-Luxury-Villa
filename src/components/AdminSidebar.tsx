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

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Link href="/admin" className={styles.logoLink}>
          <Logo height={40} className={styles.logo} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <span className={styles.sectionTitle}>Main Menu</span>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className={styles.bottom}>
        <Link href="/" className={styles.mainSiteLink}>
          <span className={styles.icon}>🏠</span>
          <span className={styles.label}>Main Site</span>
        </Link>
        <div className={styles.status}>
          <span className={styles.statusDot}></span>
          <span>Live Tracking</span>
        </div>
      </div>
    </aside>
  );
}
