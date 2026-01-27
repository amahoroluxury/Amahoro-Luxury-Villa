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
      const res = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (res.ok) window.location.href = '/admin/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <Logo height={40} className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.sectionLabel}>Menu</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <span className={styles.linkText}>{item.label}</span>
              {isActive && <div className={styles.activeIndicator} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.websiteLink}>
          View Website ↗
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
