'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../payment.module.css';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  totalAmountUsd: number;
  depositAmountUsd: number;
  balanceDueUsd: number;
  status: string;
  amountPaidUsd: number;
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'RWF'>('USD');

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/booking/${bookingId}`);
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
    }

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handlePayment = async (type: 'deposit' | 'full') => {
    setProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, type, currency }),
      });

      const data = await res.json();

      if (res.ok && data.link) {
        // Redirect to Flutterwave payment page
        window.location.href = data.link;
      } else {
        setError(data.error || 'Failed to initialize payment');
        setProcessing(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.card}>
            <h1>Loading booking details...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.card}>
            <h1>Error</h1>
            <p>{error}</p>
            <Link href="/book" className={styles.primaryBtn}>
              Start New Booking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 
    (1000 * 60 * 60 * 24)
  );

  // If already paid something, show balance payment option
  const showBalanceOption = booking.amountPaidUsd > 0 && booking.balanceDueUsd > 0;
  const isFullyPaid = booking.status === 'FullyPaid';

  const RWF_RATE = 1300; // Fixed rate for calculation display
  const getAmountDisplay = (usd: number) => {
    if (currency === 'USD') return `$${usd.toFixed(2)}`;
    return `RWF ${(usd * RWF_RATE).toLocaleString()}`;
  };

  if (isFullyPaid) {
    return (
      <div className={styles.wrapper}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.successIcon}>✓</div>
            <h1>Booking Fully Paid</h1>
            <p>Your booking is confirmed and fully paid. See you soon!</p>
            <Link href="/" className={styles.primaryBtn}>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.paymentContainer}>
          <div className={styles.bookingSummary}>
            <h2>Booking Summary</h2>
            <div className={styles.summaryRow}>
              <span>Guest</span>
              <strong>{booking.guestName}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Check-in</span>
              <strong>{formatDate(booking.checkIn)}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Check-out</span>
              <strong>{formatDate(booking.checkOut)}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Nights</span>
              <strong>{nights}</strong>
            </div>
            <hr />
            
            <div className={styles.currencyToggle}>
              <span>Pay in:</span>
              <div className={styles.toggleButtons}>
                <button 
                  className={currency === 'USD' ? styles.active : ''} 
                  onClick={() => setCurrency('USD')}
                >
                  USD
                </button>
                <button 
                  className={currency === 'RWF' ? styles.active : ''} 
                  onClick={() => setCurrency('RWF')}
                >
                  RWF
                </button>
              </div>
            </div>

            <div className={styles.summaryRow}>
              <span>Total Amount</span>
              <strong>{getAmountDisplay(booking.totalAmountUsd)}</strong>
            </div>
            {booking.amountPaidUsd > 0 && (
              <div className={styles.summaryRow}>
                <span>Amount Paid</span>
                <strong className={styles.paid}>{getAmountDisplay(booking.amountPaidUsd)}</strong>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Balance Due</span>
              <strong className={styles.due}>{getAmountDisplay(booking.balanceDueUsd)}</strong>
            </div>
          </div>

          <div className={styles.paymentOptions}>
            <h2>Select Payment Option</h2>
            
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.methodNote}>
              {currency === 'USD' 
                ? 'Best for Cards and PayPal' 
                : 'Best for Mobile Money (MTN/Airtel)'}
            </div>

            {showBalanceOption ? (
              // Already paid deposit, show balance payment
              <div className={styles.optionCard}>
                <h3>Pay Remaining Balance</h3>
                <p className={styles.amount}>{getAmountDisplay(booking.balanceDueUsd)}</p>
                <p>Complete your payment before check-in</p>
                <button
                  className={styles.primaryBtn}
                  onClick={() => handlePayment('full')}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Pay Balance Now'}
                </button>
              </div>
            ) : (
              // First payment - show deposit or full options
              <>
                <div className={styles.optionCard}>
                  <div className={styles.recommended}>Recommended</div>
                  <h3>Pay 50% Deposit</h3>
                  <p className={styles.amount}>{getAmountDisplay(booking.depositAmountUsd)}</p>
                  <p>Confirm your booking now. Pay the remaining balance before check-in.</p>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => handlePayment('deposit')}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Pay Deposit'}
                  </button>
                </div>

                <div className={styles.optionCard}>
                  <h3>Pay Full Amount</h3>
                  <p className={styles.amount}>{getAmountDisplay(booking.totalAmountUsd)}</p>
                  <p>Pay everything now and enjoy a worry-free stay.</p>
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => handlePayment('full')}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Pay in Full'}
                  </button>
                </div>
              </>
            )}

            <p className={styles.note}>
              Secure payment powered by Flutterwave. Your payment information is encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
