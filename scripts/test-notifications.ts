import { checkAndSendReminders } from '../src/lib/notification-engine';

async function runTest() {
    console.log('--- TEST: EXECUTING NOTIFICATION ENGINE ---');
    try {
        const results = await checkAndSendReminders();
        console.log('--- TEST RESULTS ---');
        console.log(JSON.stringify(results, null, 2));
        console.log('--------------------');
    } catch (err) {
        console.error('--- TEST FAILED ---');
        console.error(err);
    }
}

runTest();
