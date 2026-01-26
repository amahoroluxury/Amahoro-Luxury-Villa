'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './settings.module.css';

interface Settings {
  nightlyRate: number;
  depositPercent: number;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({ nightlyRate: 500, depositPercent: 50 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('Settings updated successfully!');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update settings');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className={styles.wrapper}><div className="container">Loading...</div></div>;

  return (
    <div className={styles.wrapper}>
      <main className="section-padding">
        <div className="container">
          <div className={styles.contentCard}>
            {message && <div className={styles.success}>{message}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSave} className={styles.form}>
              <section className={styles.section}>
                <h2>Pricing & Payments</h2>
                <div className={styles.field}>
                  <label htmlFor="nightlyRate">Nightly Rate (USD)</label>
                  <input 
                    id="nightlyRate"
                    type="number" 
                    value={settings.nightlyRate} 
                    onChange={(e) => setSettings({ ...settings, nightlyRate: parseFloat(e.target.value) })}
                    required
                  />
                  <p className={styles.hint}>This rate is used for all new bookings.</p>
                </div>

                <div className={styles.field}>
                  <label htmlFor="depositPercent">Minimum Deposit (%)</label>
                  <input 
                    id="depositPercent"
                    type="number" 
                    min="1" 
                    max="100"
                    value={settings.depositPercent} 
                    onChange={(e) => setSettings({ ...settings, depositPercent: parseInt(e.target.value) })}
                    required
                  />
                  <p className={styles.hint}>Percentage of the total amount required to confirm a booking.</p>
                </div>
              </section>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
