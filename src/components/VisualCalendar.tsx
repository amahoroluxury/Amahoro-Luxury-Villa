'use client';

import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isWithinInterval
} from 'date-fns';
import styles from '@/components/VisualCalendar.module.css';

interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
}

interface Booking {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface Props {
  initialBlocked: BlockedDate[];
  initialBookings: Booking[];
}

export default function VisualCalendar({ initialBlocked, initialBookings }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getDayStatus = (day: Date) => {
    // Check manual blocks
    const block = initialBlocked.find(b => isSameDay(new Date(b.date), day));
    if (block) return { type: 'blocked', label: block.reason || 'Blocked' };

    // Check bookings
    const booking = initialBookings.find(b => {
      const start = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      return isWithinInterval(day, { start, end });
    });
    
    if (booking) return { type: 'booked', label: booking.name, status: booking.status };

    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <div className={styles.nav}>
          <button onClick={prevMonth}>&larr;</button>
          <button onClick={() => setCurrentDate(new Date())}>Today</button>
          <button onClick={nextMonth}>&rarr;</button>
        </div>
      </div>

      <div className={styles.daysHeader}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {calendarDays.map((day, idx) => {
          const status = getDayStatus(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={idx} 
              className={`
                ${styles.cell} 
                ${!isCurrentMonth ? styles.disabled : ''} 
                ${isToday ? styles.today : ''}
                ${status ? styles[status.type] : ''}
              `}
            >
              <span className={styles.dayNumber}>{format(day, 'd')}</span>
              {status && (
                <div className={styles.event} title={status.label}>
                  {status.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}><span className={styles.bookedSample}></span> Guest Booking</div>
        <div className={styles.legendItem}><span className={styles.blockedSample}></span> Manual Block</div>
      </div>
    </div>
  );
}
