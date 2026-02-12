'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './settings.module.css';

interface Settings {
  nightlyRate: number;
  depositPercent: number;
  rwfRate: number;
  airbnbIcalUrl: string;
  weekendRate?: number;
  lastIcalSync?: string;
  icalSyncError?: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    nightlyRate: 500,
    depositPercent: 50,
    rwfRate: 1300,
    airbnbIcalUrl: '',
    weekendRate: 500
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
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
        setSettings({
          nightlyRate: data.nightlyRate ?? 500,
          depositPercent: data.depositPercent ?? 50,
          rwfRate: data.rwfRate ?? 1300,
          airbnbIcalUrl: data.airbnbIcalUrl ?? '',
          weekendRate: data.weekendRate ?? data.nightlyRate ?? 500,
          lastIcalSync: data.lastIcalSync,
          icalSyncError: data.icalSyncError
        });
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

  async function handleSync() {
    setActionLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/admin/settings/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'Failed to sync calendar');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setActionLoading(false);
      fetchSettings(); // Refresh to show new sync time/error
    }
  }

  if (loading) return <div className={styles.wrapper}><div className="container">Loading...</div></div>;

  return (
    <div className={styles.wrapper}>
      <div className="admin-container">
        <div className={styles.contentCard}>
          <div className={styles.headerWithAction}>
            <h1 className={styles.pageTitle}>System Settings</h1>
            <button
              className={styles.syncBtn}
              onClick={handleSync}
              disabled={actionLoading || saving}
            >
              {actionLoading ? 'Syncing...' : 'Force iCal Sync'}
            </button>
          </div>
          {message && <div className={styles.success}>{message}</div>}
          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSave} className={styles.form}>
            <section className={styles.section}>
              <h2>Pricing & Payments</h2>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label htmlFor="nightlyRate">Nightly Rate (USD)</label>
                  <input
                    id="nightlyRate"
                    type="number"
                    value={settings.nightlyRate}
                    onChange={(e) => setSettings({ ...settings, nightlyRate: parseFloat(e.target.value) })}
                    required
                  />
                  <p className={styles.hint}>Global nightly rate for the villa.</p>
                </div>

                <div className={styles.field}>
                  <label htmlFor="weekendRate">Weekend Rate (Fri-Sat, USD)</label>
                  <input
                    id="weekendRate"
                    type="number"
                    value={settings.weekendRate}
                    onChange={(e) => setSettings({ ...settings, weekendRate: parseFloat(e.target.value) })}
                    required
                  />
                  <p className={styles.hint}>Applied to Friday and Saturday nights stay.</p>
                </div>

                <div className={styles.field}>
                  <label htmlFor="rwfRate">RWF Exchange Rate (1 USD = ? RWF)</label>
                  <input
                    id="rwfRate"
                    type="number"
                    value={settings.rwfRate}
                    onChange={(e) => setSettings({ ...settings, rwfRate: parseFloat(e.target.value) })}
                    required
                  />
                  <p className={styles.hint}>Used for RWF price displays on the site.</p>
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
                  <p className={styles.hint}>Percentage required for booking confirmation.</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Channel Management</h2>
              <div className={styles.field}>
                <label htmlFor="airbnbIcalUrl">Airbnb iCal Export URL</label>
                <input
                  id="airbnbIcalUrl"
                  type="url"
                  placeholder="https://www.airbnb.com/calendar/ical/..."
                  value={settings.airbnbIcalUrl}
                  onChange={(e) => setSettings({ ...settings, airbnbIcalUrl: e.target.value })}
                />
                <p className={styles.hint}>Paste your Airbnb calendar export URL here to sync blocked dates.</p>
                {settings.lastIcalSync && (
                  <p className={styles.syncStatus}>
                    Last synced: {new Date(settings.lastIcalSync).toLocaleString()}
                  </p>
                )}
                {settings.icalSyncError && (
                  <p className={styles.syncError}>
                    Sync Error: {settings.icalSyncError}
                  </p>
                )}
              </div>
            </section>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? 'Saving...' : 'Save All Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
