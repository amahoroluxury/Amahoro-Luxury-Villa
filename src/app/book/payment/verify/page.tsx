'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../payment.module.css';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  
  const transactionId = searchParams.get('transaction_id');
  const statusParam = searchParams.get('status');
  const txRef = searchParams.get('tx_ref');

  useEffect(() => {
    async function verifyPayment() {
      // If cancelled, show error immediately
      if (statusParam === 'cancelled') {
        setStatus('error');
        setMessage('Payment was cancelled.');
        return;
      }

      // If successful status from Flutterwave redirect
      if (statusParam === 'successful' || statusParam === 'completed') {
        try {
          // Verify with our API
          const params = new URLSearchParams();
          if (transactionId) params.set('transaction_id', transactionId);
          if (txRef) params.set('tx_ref', txRef);
          
          const res = await fetch(`/api/payment/verify?${params.toString()}`);
          const data = await res.json();

          if (data.success) {
            setStatus('success');
            setMessage(data.isFullyPaid 
              ? 'Your booking is now fully paid!' 
              : 'Deposit received! Your booking is confirmed.');
          } else {
            setStatus('error');
            setMessage(data.message || 'Verification failed. Please contact support.');
          }
        } catch (err) {
          setStatus('error');
          setMessage('Failed to verify payment. Please contact support if payment was deducted.');
        }
      } else {
        // Unknown status
        setStatus('error');
        setMessage('Payment status unclear. Please contact support.');
      }
    }

    verifyPayment();
  }, [statusParam, transactionId, txRef]);

  return (
    <div className={styles.card}>
      {status === 'verifying' && (
        <>
          <div className={styles.loader}></div>
          <h1>Verifying Payment...</h1>
          <p>Please wait while we confirm your payment.</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className={styles.successIcon}>✓</div>
          <h1>Payment Successful!</h1>
          <p>{message}</p>
          <p>You will receive a confirmation email shortly.</p>
          <Link href="/" className={styles.primaryBtn}>
            Return Home
          </Link>
        </>
      )}
      {status === 'error' && (
        <>
          <h1>Payment Issue</h1>
          <p>{message}</p>
          <Link href="/book" className={styles.primaryBtn}>
            Try Again
          </Link>
        </>
      )}
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Suspense fallback={<div className={styles.card}><div className={styles.loader}></div><h1>Loading...</h1></div>}>
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  );
}

