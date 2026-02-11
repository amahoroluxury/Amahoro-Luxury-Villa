import ICAL from 'ical.js';
import axios from 'axios';

export interface ExternalBlock {
    start: Date;
    end: Date;
    summary?: string;
}

/**
 * Fetches and parses an external iCal feed.
 * @param url The iCal URL
 * @returns A list of blocked date intervals
 */
export async function getExternalBlockedDates(url: string): Promise<ExternalBlock[]> {
    try {
        const response = await axios.get(url);
        const data = response.data;

        // Parse the ical data using ical.js
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const blocks: ExternalBlock[] = vevents.map(vevent => {
            const event = new ICAL.Event(vevent);
            return {
                start: event.startDate.toJSDate(),
                end: event.endDate.toJSDate(),
                summary: event.summary
            };
        });

        return blocks;
    } catch (error) {
        console.error('Error fetching/parsing iCal:', error);
        return [];
    }
}
