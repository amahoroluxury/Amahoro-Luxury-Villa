'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styles from './details.module.css';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  specialRequests: string | null;
  totalAmountUsd: number;
  depositAmountUsd: number;
  amountPaidUsd: number;
  balanceDueUsd: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchBooking = useCallback(async () => {
    try {
      const res = await fetch(`/api/booking/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBooking(data);
      } else {
        setError('Booking not found');
      }
    } catch (err) {
      setError('Failed to load booking');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  async function handleMarkPaid() {
    if (!booking) return;
    
    setActionLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: booking.balanceDueUsd }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        fetchBooking(); // Refresh booking data
      } else {
        setError(data.error || 'Failed to mark as paid');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleGenerateLink() {
    setActionLoading(true);
    setMessage('');
    setError('');
    setPaymentLink('');

    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/payment-link`, {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        setPaymentLink(data.link);
        setMessage(`Payment link generated for $${data.amount.toFixed(2)}`);
      } else {
        setError(data.error || 'Failed to generate link');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    setActionLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/booking/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchBooking();
        setMessage('Booking cancelled');
      } else {
        setError('Failed to cancel booking');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRecalculate() {
    setActionLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`/api/admin/bookings/${params.id}/recalculate`, {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        setBooking(data.booking);
        setMessage(data.message);
      } else {
        setError(data.error || 'Failed to recalculate');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(paymentLink);
    setMessage('Link copied to clipboard!');
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <p>{error || 'Booking not found'}</p>
          <Link href="/admin/bookings">Back to Bookings</Link>
        </div>
      </div>
    );
  }

  const isCancelled = booking.status === 'Cancelled';
  const isFullyPaid = booking.status === 'FullyPaid';

  return (
    <div className={styles.wrapper}>
      <header className={styles.pageHeader}>
        <div className="admin-container">
          <div className={styles.breadcrumb}>
            <Link href="/admin/bookings">&larr; Back to Bookings</Link>
          </div>
          <h1>Booking Details</h1>
          <p className={styles.subtitle}>Viewing reservation for {booking.guestName}</p>
        </div>
      </header>

      <div className="admin-container">
        {message && <div className={styles.success}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.grid}>
          <div className={styles.mainInfo}>
            <section className={styles.section}>
              <h2>Guest Information</h2>
              <div className={styles.infoRow}>
                <span>Name:</span> <strong>{booking.guestName}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Email:</span> <strong>{booking.guestEmail}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Phone:</span> <strong>{booking.guestPhone}</strong>
              </div>
              {booking.specialRequests && (
                <div className={styles.infoRow}>
                  <span>Special Requests:</span> 
                  <p className={styles.requestNote}>{booking.specialRequests}</p>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <h2>Stay Details</h2>
              <div className={styles.infoRow}>
                <span>Dates:</span> 
                <strong>
                  {format(new Date(booking.checkIn), 'MMM dd, yyyy')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                </strong>
              </div>
              <div className={styles.infoRow}>
                <span>Guests:</span> <strong>{booking.guestsCount}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Booked On:</span> <strong>{format(new Date(booking.createdAt), 'MMM dd, yyyy h:mm a')}</strong>
              </div>
            </section>
          </div>

          <div className={styles.paymentInfo}>
            <section className={styles.section}>
              <h2>Payment Status</h2>
              <div className={styles.statusBadge}>
                <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                  {booking.status}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span>Total Amount:</span> <strong>${booking.totalAmountUsd.toFixed(2)}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Amount Paid:</span> <strong className={styles.paid}>${booking.amountPaidUsd.toFixed(2)}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Balance Due:</span> <strong className={styles.due}>${booking.balanceDueUsd.toFixed(2)}</strong>
              </div>

              {!isCancelled && !isFullyPaid && (
                <div className={styles.actions}>
                  <button 
                    className={styles.primaryBtn}
                    onClick={handleMarkPaid}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Processing...' : 'Mark Full Payment Received (Offline)'}
                  </button>
                  <p className={styles.adminNote}>
                    Note: Balance links are disabled as full payment is now required at booking.
                  </p>
                </div>
              )}

              <button 
                className={styles.utilityBtn}
                onClick={handleRecalculate}
                disabled={actionLoading}
              >
                {actionLoading ? 'Recalculating...' : 'Recalculate Totals'}
              </button>

              {paymentLink && (
                <div className={styles.paymentLinkBox}>
                  <label>Payment Link:</label>
                  <input type="text" value={paymentLink} readOnly aria-label="Payment link URL" />
                  <button onClick={copyToClipboard} className={styles.copyBtn}>Copy</button>
                </div>
              )}

              {!isCancelled && (
                <button 
                  className={styles.dangerBtn}
                  onClick={handleCancel}
                  disabled={actionLoading}
                >
                  Cancel Booking
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
