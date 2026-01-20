import prisma from './prisma';
import { isWithinInterval, startOfDay } from 'date-fns';

export async function getAvailability(checkIn: Date, checkOut: Date) {
  // 1. Get all manually blocked dates
  const blockedDates = await prisma.blockedDate.findMany();
  
  // 2. Get all confirmed bookings
  const confirmedBookings = await prisma.booking.findMany({
    where: {
      status: {
        in: ['DepositPaid', 'FullyPaid']
      }
    }
  });

  const requestedStart = startOfDay(checkIn);
  const requestedEnd = startOfDay(checkOut);

  // Check manual blocks
  const isBlocked = blockedDates.some(block => {
    const blockDate = startOfDay(block.date);
    return blockDate >= requestedStart && blockDate < requestedEnd;
  });

  if (isBlocked) return false;

  // Check booking overlaps
  const hasOverlap = confirmedBookings.some(booking => {
    const bookingStart = startOfDay(booking.checkIn);
    const bookingEnd = startOfDay(booking.checkOut);
    
    return (
      (requestedStart >= bookingStart && requestedStart < bookingEnd) ||
      (requestedEnd > bookingStart && requestedEnd <= bookingEnd) ||
      (requestedStart <= bookingStart && requestedEnd >= bookingEnd)
    );
  });

  return !hasOverlap;
}

export function calculatePrice(nights: number) {
  const nightlyRate = 350; // Base rate USD (should be configurable)
  const total = nights * nightlyRate;
  const deposit = total * 0.5;
  const balance = total - deposit;

  return {
    nightlyRate,
    total,
    deposit,
    balance
  };
}
