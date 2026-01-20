'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../payment.module.css';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const transactionId = searchParams.get('transaction_id');
  const statusParam = searchParams.get('status');

  useEffect(() => {
    if (statusParam === 'successful' || statusParam === 'completed') {
      setStatus('success');
    } else if (statusParam === 'cancelled') {
        setStatus('error');
    }
  }, [statusParam]);

  return (
    <div className={styles.card}>
      {status === 'verifying' && <h1>Verifying Payment...</h1>}
      {status === 'success' && (
        <>
          <h1>Payment Successful!</h1>
          <p>Your booking is now confirmed. You will receive an email shortly.</p>
          <button 
            className={styles.primaryBtn} 
            onClick={() => router.push('/')}
          >
            Return Home
          </button>
        </>
      )}
      {status === 'error' && (
        <>
          <h1>Payment Failed or Cancelled</h1>
          <p>There was an issue processing your payment. Please try again or contact us.</p>
          <button 
            className={styles.primaryBtn} 
            onClick={() => router.back()}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  );
}
