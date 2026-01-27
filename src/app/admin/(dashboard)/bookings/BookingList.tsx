'use client';

import { useState, useMemo } from 'react';
import { format, differenceInDays } from 'date-fns';
import Link from 'next/link';
import styles from './bookings.module.css';

import QuickAddBooking from '@/components/QuickAddBooking';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  totalAmountUsd: number;
  amountPaidUsd: number;
  status: string;
}

interface BookingListProps {
  initialBookings: Booking[];
}

export default function BookingList({ initialBookings }: BookingListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const router = useRouter();

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      const matchesSearch = 
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'ALL' || 
        booking.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [initialBookings, searchTerm, statusFilter]);

  const getNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(0, differenceInDays(end, start));
  };

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterBox}>
          <select 
            title="Filter bookings by status"
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDINGDEPOSIT">Pending Deposit</option>
            <option value="DEPOSITPAID">Deposit Paid</option>
            <option value="FULLYPAID">Fully Paid</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className={styles.actionBox}>
          <a href="/api/admin/bookings/export" className={styles.exportBtn} target="_blank" rel="noopener noreferrer">
             Export CSV
          </a>
          <button onClick={() => setIsQuickAddOpen(true)} className={styles.newBtn}>
            + New Booking
          </button>
        </div>
      </div>

      {isQuickAddOpen && (
        <QuickAddBooking 
          onClose={() => setIsQuickAddOpen(false)} 
          onSuccess={() => {
            router.refresh();
          }} 
        />
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Dates</th>
              <th>Nights</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div className={styles.guestInfo}>
                      <strong>{booking.guestName}</strong>
                      <span>{booking.guestEmail}</span>
                    </div>
                  </td>
                  <td>
                    {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                  </td>
                  <td>{getNights(booking.checkIn, booking.checkOut)}</td>
                  <td>${booking.totalAmountUsd.toLocaleString()}</td>
                  <td>
                    <span className={booking.amountPaidUsd < booking.totalAmountUsd ? styles.partialAmount : styles.fullAmount}>
                      ${booking.amountPaidUsd.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <Link href={`/admin/bookings/${booking.id}`} className={styles.viewLink}>Details</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyRow}>No bookings found matching your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
