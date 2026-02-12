import prisma from './prisma';
import { isWithinInterval, startOfDay } from 'date-fns';
import { getExternalBlockedDates, ExternalBlock } from './ical';

// Simple in-memory cache for external blocks
let cachedExternalBlocks: ExternalBlock[] = [];
let lastCacheUpdate: number = 0;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

export function clearIcalCache() {
  lastCacheUpdate = 0;
  cachedExternalBlocks = [];
}

export async function getAvailability(checkIn: Date, checkOut: Date) {
  // 1. Get settings for iCal URL
  const settings = await prisma.settings.findFirst() as any;

  // 2. Get all manually blocked dates
  const blockedDates = await prisma.blockedDate.findMany();

  // 3. Get all confirmed bookings
  const confirmedBookings = await prisma.booking.findMany({
    where: {
      status: {
        in: ['DepositPaid', 'FullyPaid']
      }
    }
  });

  // 4. Handle External iCal Blocks
  let externalBlocks = cachedExternalBlocks;
  const now = Date.now();

  if (settings?.airbnbIcalUrl && (now - lastCacheUpdate > CACHE_DURATION || externalBlocks.length === 0)) {
    try {
      externalBlocks = await getExternalBlockedDates(settings.airbnbIcalUrl);
      cachedExternalBlocks = externalBlocks;
      lastCacheUpdate = now;
    } catch (error) {
      console.error('Failed to update iCal cache:', error);
    }
  }

  const requestedStart = startOfDay(checkIn);
  const requestedEnd = startOfDay(checkOut);

  // Check manual blocks
  const isBlockedManually = blockedDates.some((block: any) => {
    const blockDate = startOfDay(block.date);
    return blockDate >= requestedStart && blockDate < requestedEnd;
  });

  if (isBlockedManually) return false;

  // Check external iCal blocks
  const isBlockedExternally = externalBlocks.some((block) => {
    const blockStart = startOfDay(block.start);
    const blockEnd = startOfDay(block.end);

    return (
      (requestedStart >= blockStart && requestedStart < blockEnd) ||
      (requestedEnd > blockStart && requestedEnd <= blockEnd) ||
      (requestedStart <= blockStart && requestedEnd >= blockEnd)
    );
  });

  if (isBlockedExternally) return false;

  // Check booking overlaps
  const hasOverlap = confirmedBookings.some((booking: any) => {
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

export async function calculatePrice(nights: number, checkIn?: Date) {
  // Fetch settings from DB
  const settings = await prisma.settings.findFirst() as any;

  const standardRate = settings?.nightlyRate ?? 200;
  const weekendRate = settings?.weekendRate ?? standardRate;
  const depositPercent = (settings?.depositPercent ?? 50) / 100;

  let total = 0;

  if (checkIn) {
    const startDate = startOfDay(new Date(checkIn));
    // Calculate precise total based on day of week
    for (let i = 0; i < nights; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

      // Friday and Saturday nights are typically considered "weekends" in rental terms
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        total += weekendRate;
      } else {
        total += standardRate;
      }
    }
  } else {
    // Fallback to standard calculation if no start date provided
    total = nights * standardRate;
  }

  const deposit = total * depositPercent;
  const balance = total - deposit;

  return {
    nightlyRate: standardRate,
    weekendRate,
    total,
    deposit,
    balance
  };
}
