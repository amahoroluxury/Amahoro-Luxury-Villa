import prisma from './prisma';

const CACHE_KEY = 'USD_RWF_RATE';
const CACHE_TTL = 3600 * 1000; // 1 hour

let cachedRate: number | null = null;
let lastFetchTime = 0;

export async function getExchangeRate(): Promise<number> {
    const now = Date.now();

    // Return cached rate if still valid
    if (cachedRate && (now - lastFetchTime < CACHE_TTL)) {
        return cachedRate;
    }

    try {
        // Attempt to fetch live rate from a public API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (response.ok) {
            const data = await response.json();
            const rate = data.rates?.RWF;
            if (rate) {
                cachedRate = rate;
                lastFetchTime = now;
                return rate;
            }
        }
    } catch (error) {
        console.error('Failed to fetch live exchange rate:', error);
    }

    // Fallback: Get from database settings
    const settings = await prisma.settings.findFirst();
    const fallbackRate = settings?.rwfRate ?? 1300;

    // Update cache with fallback to prevent hammering the DB/API if it's failing
    cachedRate = fallbackRate;
    lastFetchTime = now;

    return fallbackRate;
}

/**
 * Converts USD to RWF using the current exchange rate
 */
export async function convertUsdToRwf(amountUsd: number): Promise<number> {
    const rate = await getExchangeRate();
    return Math.round(amountUsd * rate);
}

/**
 * Converts RWF to USD using the current exchange rate
 */
export async function convertRwfToUsd(amountRwf: number): Promise<number> {
    const rate = await getExchangeRate();
    return amountRwf / rate;
}
