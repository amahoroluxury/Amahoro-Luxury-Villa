'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, differenceInDays } from 'date-fns';
import { calculatePrice } from '@/lib/booking-logic';
import styles from './booking.module.css';

export default function BookingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  const price = calculatePrice(nights > 0 ? nights : 0);

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
        router.push(`/book/confirmation/${data.id}`);
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
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="checkIn">Check-in</label>
              <input 
                id="checkIn"
                type="date" 
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="checkOut">Check-out</label>
              <input 
                id="checkOut"
                type="date" 
                value={formData.checkOut}
                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="guests">Guests</label>
              <select 
                id="guests"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} Guests</option>
                ))}
              </select>
            </div>
          </div>

          {nights > 0 && (
            <div className={styles.summary}>
              <p><span>Nightly Rate:</span> <span>${price.nightlyRate}</span></p>
              <p><span>Nights:</span> <span>{nights}</span></p>
              <p className={styles.total}><span>Total:</span> <span>${price.total}</span></p>
              <p className={styles.deposit}><span>50% Deposit Due:</span> <span>${price.deposit}</span></p>
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone Number</label>
              <input 
                id="phone"
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="requests">Special Requests</label>
            <textarea 
              id="requests"
              value={formData.requests}
              onChange={(e) => setFormData({...formData, requests: e.target.value})}
              rows={4}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(1)} className={styles.secondaryBtn}>Back</button>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
