"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './mobile-bar.module.css';

export default function MobileBookingBar() {
    const pathname = usePathname();

    // Don't show on the booking page itself or admin
    if (pathname.startsWith('/book') || pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className={styles.bar}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <span className={styles.price}>From $500</span>
                    <span className={styles.unit}>/ night</span>
                </div>
                <Link href="/book" className={styles.bookBtn}>
                    Check Availability
                </Link>
            </div>
        </div>
    );
}
