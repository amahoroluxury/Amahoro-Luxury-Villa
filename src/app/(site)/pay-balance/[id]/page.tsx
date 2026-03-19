'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './pay-balance.module.css';

interface Booking {
    id: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    totalAmountUsd: number;
    amountPaidUsd: number;
    balanceDueUsd: number;
    status: string;
}

export default function PayBalancePage({ params }: { params: { id: string } }) {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const res = await fetch(`/api/booking/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBooking(data);
                } else {
                    setError('Booking not found or already paid.');
                }
            } catch (err) {
                setError('Failed to load booking details.');
            } finally {
                setLoading(false);
            }
        }
        fetchBooking();
    }, [params.id]);

    async function handlePayment() {
        if (!booking) return;
        setIsRedirecting(true);

        try {
            const res = await fetch(`/api/payment/initialize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: booking.id,
                    type: 'balance',
                }),
            });

            const data = await res.json();
            if (res.ok && data.link) {
                window.location.href = data.link;
            } else {
                alert(data.error || 'Failed to initialize payment.');
                setIsRedirecting(false);
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
            setIsRedirecting(false);
        }
    }

    if (loading) return <div className={styles.container}><p>Loading booking details...</p></div>;
    if (error || !booking) return <div className={styles.container}><p className={styles.error}>{error || 'Booking not found'}</p></div>;

    const isPaid = booking.status === 'FullyPaid' || booking.balanceDueUsd <= 0;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Complete Your Reservation</h1>
                <p className={styles.subtitle}>Amahoro Luxury Villa</p>

                <div className={styles.details}>
                    <div className={styles.row}>
                        <span>Guest Name:</span>
                        <strong>{booking.guestName}</strong>
                    </div>
                    <div className={styles.row}>
                        <span>Stay Dates:</span>
                        <strong>
                            {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                        </strong>
                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.row}>
                        <span>Total Amount:</span>
                        <span>${booking.totalAmountUsd.toFixed(2)}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Already Paid:</span>
                        <span className={styles.paid}>-${booking.amountPaidUsd.toFixed(2)}</span>
                    </div>
                    <div className={`${styles.row} ${styles.totalRow}`}>
                        <span>Balance Due:</span>
                        <span className={styles.due}>${booking.balanceDueUsd.toFixed(2)}</span>
                    </div>
                </div>

                {isPaid ? (
                    <div className={styles.successMessage}>
                        <p>This booking is already fully paid. We look forward to seeing you!</p>
                    </div>
                ) : (
                    <button
                        className={styles.payButton}
                        onClick={handlePayment}
                        disabled={isRedirecting}
                    >
                        {isRedirecting ? 'Redirecting to Payment...' : `Pay Balance $${booking.balanceDueUsd.toFixed(2)}`}
                    </button>
                )}

                <p className={styles.secureHint}>
                    Secure payment powered by DPO Pay. Accepts International Cards & Local Mobile Money.
                </p>
            </div>
        </div>
    );
}
