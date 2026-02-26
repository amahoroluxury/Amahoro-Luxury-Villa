"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import { X } from 'lucide-react';
import VisualCalendar from './VisualCalendar';
import styles from './booking.module.css';

export default function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [calendarData, setCalendarData] = useState({ blocked: [], bookings: [] });
  const [error, setError] = useState('');
  const [price, setPrice] = useState({ nightlyRate: 200, total: 0, deposit: 0, balance: 0, depositPercent: 100, damageFee: 0, grandTotal: 0 });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState<'checkIn' | 'checkOut' | null>(null);

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    requests: '',
  });

  const nights = formData.checkIn && formData.checkOut
    ? differenceInDays(new Date(formData.checkOut), new Date(formData.checkIn))
    : 0;

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await fetch('/api/calendar/public');
        if (res.ok) {
          const data = await res.json();
          setCalendarData(data);
        }
      } catch (err) {
        console.error('Failed to fetch calendar data');
      } finally {
        setCalendarLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  useEffect(() => {
    async function updatePrice() {
      try {
        const res = await fetch(`/api/availability/price?nights=${nights}&checkIn=${formData.checkIn}`);
        if (res.ok) {
          const data = await res.json();
          setPrice(data);
        }
      } catch (err) {
        console.error('Failed to fetch price');
      }
    }

    if (nights > 0) {
      updatePrice();
    }
  }, [nights, formData.checkIn]);

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.checkIn || !formData.checkOut || nights <= 0) {
        setError('Please select valid check-in and check-out dates.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/availability?checkIn=${formData.checkIn}&checkOut=${formData.checkOut}`);
        const data = await res.json();

        if (data.available) {
          setStep(2);
        } else {
          setError('Sorry, those dates are already booked or blocked.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/book/payment/${data.id}`);
      } else {
        setError(data.error || 'Failed to create booking.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.activeStep : ''}`}>1. Dates</div>
        <div className={`${styles.step} ${step >= 2 ? styles.activeStep : ''}`}>2. Details</div>
        <div className={`${styles.step} ${step >= 3 ? styles.activeStep : ''}`}>3. Payment</div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {step === 1 && (
        <div className={styles.formSection}>
          <h2>Select Dates</h2>

          <div className={styles.calendarWrapper}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="checkIn">Check-in</label>
                <div className={styles.calendarTrigger} onClick={() => { setActiveField('checkIn'); setShowCalendar(true); }}>
                  <input
                    id="checkIn"
                    type="text"
                    value={formData.checkIn ? format(new Date(formData.checkIn), 'MMM dd, yyyy') : ''}
                    readOnly
                    placeholder="Select Check-in Date"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="checkOut">Check-out</label>
                <div className={styles.calendarTrigger} onClick={() => { setActiveField('checkOut'); setShowCalendar(true); }}>
                  <input
                    id="checkOut"
                    type="text"
                    value={formData.checkOut ? format(new Date(formData.checkOut), 'MMM dd, yyyy') : ''}
                    readOnly
                    placeholder="Select Check-out Date"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="guests">Guests</label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>

            {showCalendar && (
              <div className={styles.calendarOverlay}>
                <div className={styles.calendarContent}>
                  <div className={styles.calendarHeader}>
                    <h3>Availability Calendar</h3>
                    <button className={styles.closeBtn} onClick={() => setShowCalendar(false)} title="Close Calendar" aria-label="Close Calendar">
                      <X size={20} />
                    </button>
                  </div>
                  {calendarLoading ? (
                    <div className={styles.calendarLoader}>Loading availability...</div>
                  ) : (
                    <VisualCalendar
                      initialBlocked={calendarData.blocked}
                      initialBookings={calendarData.bookings}
                      checkIn={formData.checkIn ? new Date(formData.checkIn) : null}
                      checkOut={formData.checkOut ? new Date(formData.checkOut) : null}
                      onDateClick={(date) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        if (activeField === 'checkIn') {
                          setFormData(prev => {
                            const newCheckIn = dateStr;
                            let newCheckOut = prev.checkOut;
                            // If checkout is before new checkin, clear it
                            if (newCheckOut && newCheckOut <= newCheckIn) {
                              newCheckOut = '';
                            }
                            return { ...prev, checkIn: newCheckIn, checkOut: newCheckOut };
                          });
                        } else if (activeField === 'checkOut') {
                          setFormData(prev => {
                            const newCheckOut = dateStr;
                            let newCheckIn = prev.checkIn;
                            // If checkin is after new checkout, swap or clear? 
                            // User wants flexibility. Let's just set it if valid, or clear checkin if invalid.
                            if (newCheckIn && newCheckIn >= newCheckOut) {
                              newCheckIn = '';
                            }
                            return { ...prev, checkIn: newCheckIn, checkOut: newCheckOut };
                          });
                        }
                        setShowCalendar(false);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {nights > 0 ? (
            <div className={styles.summary}>
              <p><span>Nightly Rate (Avg):</span> <span>${Math.round(price.total / nights)}</span></p>
              <p><span>Nights:</span> <span>{nights}</span></p>
              <p className={styles.total}><span>Rental Total:</span> <span>${price.total}</span></p>
              <p className={styles.deposit}><span>Refundable Damage Fee (20%):</span> <span>${price.damageFee}</span></p>
              <p className={styles.grandTotal}><span><strong>Total Due at Booking:</strong></span> <span><strong>${price.grandTotal}</strong></span></p>
            </div>
          ) : (
            <div className={styles.initialPrice}>
              <p>Stays are <strong>$200 / night</strong></p>
              <p className={styles.priceSubtext}>Select dates to see total price and availability</p>
            </div>
          )}

          <button
            className={styles.primaryBtn}
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Availability'}
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <h2>Guest Details</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="requests">Special Requests</label>
            <textarea
              id="requests"
              value={formData.requests}
              onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
              rows={4}
            />
          </div>

          <div className={styles.checkboxField}>
            <input
              type="checkbox"
              id="acceptedTerms"
              className={styles.checkboxInput}
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />
            <label htmlFor="acceptedTerms" className={styles.checkboxLabel}>
              I have read and agree to the <Link href="/house-rules" target="_blank">House Rules</Link> and <Link href="/policies" target="_blank">Cancellation Policy</Link>.
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(1)} className={styles.secondaryBtn}>Back</button>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading || !acceptedTerms}
            >
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
