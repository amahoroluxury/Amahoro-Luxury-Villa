'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../payment.module.css';

export default function PaymentInitiatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function startPayment() {
      try {
        const res = await fetch('/api/payment/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: params.id, type: 'deposit' }),
        });

        const data = await res.json();
        if (data.link) {
          window.location.href = data.link;
        } else {
          setError(data.error || 'Failed to initialize payment');
          setLoading(false);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setLoading(false);
      }
    }

    startPayment();
  }, [params.id]);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.card}>
          {loading ? (
            <>
              <h1>Initializing Payment...</h1>
              <p>Please wait while we prepare your secure checkout.</p>
              <div className={styles.loader}></div>
            </>
          ) : (
            <>
              <h1>Payment Error</h1>
              <p>{error}</p>
              <button className={styles.primaryBtn} onClick={() => router.back()}>
                Go Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
