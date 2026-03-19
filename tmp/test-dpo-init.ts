async function testDPO() {
  console.log('--- Testing DPO Pay Initialization ---');
  try {
    // Get a valid booking ID first
    const bookingRes = await fetch('http://localhost:3000/api/booking/all');
    const bookings = await bookingRes.json();
    if (!bookings || bookings.length === 0) {
      console.log('No bookings found to test with.');
      return;
    }
    const bookingId = bookings[0].id;

    const response = await fetch('http://localhost:3000/api/payment/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, type: 'deposit', currency: 'USD' }),
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));

    if (data.error && data.error.includes('YOUR_COMPANY_TOKEN')) {
      console.log('SUCCESS: Route correctly identified missing real DPO credentials.');
    } else if (data.link) {
      console.log('SUCCESS: Redirect link generated (Sandbox works).');
    }
  } catch (err) {
    console.error('Test Failed:', err);
  }
}

testDPO();
