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
  isWithinInterval,
  isBefore,
  startOfDay
} from 'date-fns';
import styles from '@/components/VisualCalendar.module.css';

interface BlockedDate {
  id: string;
  date: string;
  endDate?: string;
  reason: string | null;
  isExternal?: boolean;
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
  checkIn?: Date | null;
  checkOut?: Date | null;
  onDateClick?: (date: Date) => void;
}

/**
 * Parse a date string timezone-safely.
 * 'yyyy-MM-dd' strings parsed via new Date() are treated as UTC,
 * which causes off-by-one errors in positive timezone offsets.
 */
function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date(NaN);
  // Handle ISO datetime strings
  if (dateStr.includes('T')) {
    const d = new Date(dateStr);
    return startOfDay(d);
  }
  // Handle yyyy-MM-dd strings: parse as local date
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  return startOfDay(new Date(dateStr));
}

export default function VisualCalendar({
  initialBlocked,
  initialBookings,
  checkIn = null,
  checkOut = null,
  onDateClick = () => { }
}: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calStartDate = startOfWeek(monthStart);
  const calEndDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calStartDate,
    end: calEndDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getDayStatus = (day: Date) => {
    const dayStart = startOfDay(day);
    const today = startOfDay(new Date());

    // Past dates are unavailable
    if (isBefore(dayStart, today)) {
      return { type: 'blocked' as const, label: 'Past' };
    }

    // Check manual blocks (single dates)
    const singleBlock = initialBlocked.find(b => {
      if (b.isExternal || b.endDate) return false;
      const blockDate = parseLocalDate(b.date);
      return isSameDay(blockDate, dayStart);
    });
    if (singleBlock) return { type: 'blocked' as const, label: singleBlock.reason || 'Blocked' };

    // Check external / range blocks (date ranges with endDate)
    const rangeBlock = initialBlocked.find(b => {
      if (!b.endDate && !b.isExternal) return false;
      const blockStart = parseLocalDate(b.date);
      const blockEnd = b.endDate ? parseLocalDate(b.endDate) : blockStart;
      // Day falls within the block range [start, end)
      return (isSameDay(dayStart, blockStart) || isSameDay(dayStart, blockEnd) ||
        (dayStart > blockStart && dayStart < blockEnd));
    });
    if (rangeBlock) return { type: 'blocked' as const, label: rangeBlock.reason || 'Unavailable' };

    // Check bookings
    const booking = initialBookings.find(b => {
      const bookStart = parseLocalDate(b.checkIn);
      const bookEnd = parseLocalDate(b.checkOut);
      // Booking occupies [checkIn, checkOut) — checkout day is available
      return (isSameDay(dayStart, bookStart) ||
        (dayStart > bookStart && dayStart < bookEnd));
    });

    if (booking) return { type: 'booked' as const, label: booking.name, status: booking.status };

    return null;
  };

  const handleDayClick = (day: Date) => {
    if (!isSameMonth(day, monthStart)) return;
    const status = getDayStatus(day);
    if (status) return; // Can't select blocked/booked dates

    onDateClick(day);
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

          const isSelected = (checkIn && isSameDay(day, checkIn)) ||
            (checkOut && isSameDay(day, checkOut)) ||
            (checkIn && checkOut && day > checkIn && day < checkOut);

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(day)}
              className={`
                ${styles.cell}
                ${!isCurrentMonth ? styles.disabled : ''}
                ${isToday ? styles.today : ''}
                ${status ? styles[status.type] : ''}
                ${status ? styles.unavailable : ''}
                ${isSelected ? styles.selected : ''}
              `}
              title={status ? status.label : undefined}
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
        <div className={styles.legendItem}><span className={styles.blockedSample}></span> Unavailable</div>
      </div>
    </div>
  );
}
