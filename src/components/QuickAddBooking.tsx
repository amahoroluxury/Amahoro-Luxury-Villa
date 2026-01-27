'use client';

import { useState } from 'react';
import styles from './QuickAddBooking.module.css';

interface QuickAddProperties {
  onClose: () => void;
  onSuccess: () => void;
}

export default function QuickAddBooking({ onClose, onSuccess }: QuickAddProperties) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    status: 'PendingDeposit', // Admin can override status? Maybe minimal MVP first.
    // For now, let's stick to the core create logic which defaults to PendingDeposit
    // Admin might want to set it to 'DepositPaid' immediately if they took cash.
    // Let's add a checkbox for "Mark Deposit Paid"
    markPaid: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create Booking using standard API
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          requests: 'Manual Admin Booking'
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create booking');
      }

      const booking = await res.json();

      // 2. If marked paid, update the status immediately (optional enhancement)
      // This would require a second API call to update status or a more privileged create endpoint.
      // For MVP V1, let's just create it as PendingDeposit and user can update it in details.

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Quick Add Booking</h2>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="guestName">Guest Name</label>
            <input 
              id="guestName"
              type="text" 
              required 
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="guestEmail">Email</label>
              <input 
                id="guestEmail"
                type="email" 
                required 
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="guestPhone">Phone</label>
              <input 
                id="guestPhone"
                type="tel" 
                required 
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="checkIn">Check In</label>
              <input 
                id="checkIn"
                type="date" 
                required 
                title="Check-in Date"
                value={formData.checkIn}
                onChange={e => setFormData({...formData, checkIn: e.target.value})}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="checkOut">Check Out</label>
              <input 
                id="checkOut"
                type="date" 
                required 
                title="Check-out Date"
                value={formData.checkOut}
                onChange={e => setFormData({...formData, checkOut: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="guestCount">Guests</label>
            <input 
              id="guestCount"
              type="number" 
              min="1" 
              max="10" 
              required 
              title="Number of Guests"
              value={formData.guests}
              onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
