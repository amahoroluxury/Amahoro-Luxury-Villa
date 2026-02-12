const { checkAndSendReminders } = require('./src/lib/notification-engine');

// Note: This requires the file to be JS or handled by a loader.
// Since I'm in a Next.js environment, I'll use a more direct method: 
// a temporary API route that I can call or a standalone script.

async function runTest() {
    console.log('--- Executing Notification Engine Logic ---');
    try {
        // We'll bypass the API and call the function directly
        const results = await checkAndSendReminders();
        console.log('Test Results:', JSON.stringify(results, null, 2));
    } catch (err) {
        console.error('Test Failed:', err);
    }
}

runTest();
