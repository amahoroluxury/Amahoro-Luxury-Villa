'use client';

import { useState } from 'react';
import styles from './CalendarManager.module.css';

interface Props {
  initialBlocked: string[];
}

export default function CalendarManager({ initialBlocked }: Props) {
  const [blocked, setBlocked] = useState(initialBlocked);
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, reason }),
      });
      
      if (res.ok) {
        setBlocked([...blocked, new Date(date).toISOString()]);
        setDate('');
        setReason('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Block New Dates</h2>
      <form onSubmit={handleBlock} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="date">Select Date</label>
          <input 
            id="date"
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="reason">Reason (Internal)</label>
          <input 
            id="reason"
            type="text" 
            placeholder="e.g. Maintenance, Personal Use" 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.blockBtn} disabled={loading}>
          {loading ? 'Processing...' : 'Block Date'}
        </button>
      </form>
      <p className={styles.note}>Blocked dates will be unavailable for guest selection on the main site.</p>
    </div>
  );
}
