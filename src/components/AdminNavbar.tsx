'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import styles from './AdminNavbar.module.css';

export default function AdminNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin' },
    { label: 'Bookings', href: '/admin/bookings' },
    { label: 'Calendar', href: '/admin/calendar' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logoGroup}>
            <Link href="/admin">
              <Logo height={40} className={styles.logo} />
            </Link>
          </div>
          <nav className={styles.adminNav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={isActive ? styles.active : ''}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/" className={styles.mainSiteLink}>Main Site</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
