/**
 * Email Service for Amahoro Luxury Villa
 * 
 * Uses Resend for sending transactional emails.
 * Fallback to console logging in development if no API key is set.
 */

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  checkIn: Date | string;
  checkOut: Date | string;
  totalAmountUsd: number;
  depositAmountUsd: number;
  bookingId: string;
  guestsCount: number;
}

interface PaymentEmailData extends BookingEmailData {
  amountPaid: number;
  isFullyPaid: boolean;
  balanceDue: number;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@amahoroluxuryvilla.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Amahoro Luxury Villa <bookings@amahoroluxuryvilla.com>';

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log('=== EMAIL (No API Key - Dev Mode) ===');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${html.substring(0, 200)}...`);
    console.log('====================================');
    return { success: true, dev: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Email send failed:', data);
      return { success: false, error: data };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendBookingConfirmation(booking: BookingEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #8B5A3C; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #8B5A3C; }
        .content { padding: 30px 0; }
        .details { background: #f9f5f1; padding: 20px; margin: 20px 0; }
        .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .details-row:last-child { border-bottom: none; }
        .amount { font-size: 24px; color: #8B5A3C; font-weight: bold; text-align: center; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
        .note { background: #fff8e1; border-left: 4px solid #f57c00; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Amahoro Luxury Villa</div>
          <p>Booking Confirmation</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.guestName},</p>
          
          <p>Thank you for your booking! We're excited to host you at Amahoro Luxury Villa.</p>
          
          <div class="details">
            <div class="details-row">
              <span>Check-in:</span>
              <strong>${formatDate(booking.checkIn)}</strong>
            </div>
            <div class="details-row">
              <span>Check-out:</span>
              <strong>${formatDate(booking.checkOut)}</strong>
            </div>
            <div class="details-row">
              <span>Guests:</span>
              <strong>${booking.guestsCount}</strong>
            </div>
            <div class="details-row">
              <span>Total Amount:</span>
              <strong>$${booking.totalAmountUsd.toFixed(2)}</strong>
            </div>
            <div class="details-row">
              <span>Full Payment Required:</span>
              <strong>$${booking.totalAmountUsd.toFixed(2)}</strong>
            </div>
          </div>
          
          <div class="note">
            <strong>Next Step:</strong> Please complete your full payment to confirm your booking. 
            A 20% refundable damage fee will also be collected and refunded within 12 hours after checkout supervision, provided the property is left in good condition.
          </div>
          
          <p>Booking Reference: <strong>${booking.bookingId.slice(0, 8).toUpperCase()}</strong></p>
          
          <p>If you have any questions, please don't hesitate to contact us via WhatsApp or email.</p>
          
          <p>Warm regards,<br>Amahoro Luxury Villa Team</p>
        </div>
        
        <div class="footer">
          <p>Kibagabaga, Kigali, Rwanda</p>
          <p>© ${new Date().getFullYear()} Amahoro Luxury Villa. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    booking.guestEmail,
    `Booking Confirmation - Amahoro Luxury Villa`,
    html
  );
}

export async function sendPaymentConfirmation(data: PaymentEmailData) {
  const statusMessage = data.isFullyPaid
    ? 'Your booking is now fully paid!'
    : `Deposit received! Remaining balance: $${data.balanceDue.toFixed(2)}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #8B5A3C; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #8B5A3C; }
        .success-badge { background: #e8f5e9; color: #2e7d32; padding: 15px 30px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .content { padding: 30px 0; }
        .details { background: #f9f5f1; padding: 20px; margin: 20px 0; }
        .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .details-row:last-child { border-bottom: none; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Amahoro Luxury Villa</div>
          <p>Payment Confirmation</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.guestName},</p>
          
          <div style="text-align: center;">
            <span class="success-badge">✓ Payment Received</span>
          </div>
          
          <p>We have received your payment of <strong>$${data.amountPaid.toFixed(2)}</strong>.</p>
          
          <p>${statusMessage}</p>
          
          <div class="details">
            <div class="details-row">
              <span>Check-in:</span>
              <strong>${formatDate(data.checkIn)}</strong>
            </div>
            <div class="details-row">
              <span>Check-out:</span>
              <strong>${formatDate(data.checkOut)}</strong>
            </div>
            <div class="details-row">
              <span>Total Amount:</span>
              <strong>$${data.totalAmountUsd.toFixed(2)}</strong>
            </div>
            <div class="details-row">
              <span>Amount Paid:</span>
              <strong style="color: #2e7d32;">$${(data.totalAmountUsd - data.balanceDue).toFixed(2)}</strong>
            </div>
            ${!data.isFullyPaid ? `
            <div class="details-row">
              <span>Balance Due:</span>
              <strong style="color: #c62828;">$${data.balanceDue.toFixed(2)}</strong>
            </div>
            ` : ''}
          </div>
          
          <p>Booking Reference: <strong>${data.bookingId.slice(0, 8).toUpperCase()}</strong></p>
          
          <p>We look forward to welcoming you!</p>
          
          <p>Warm regards,<br>Amahoro Luxury Villa Team</p>
        </div>
        
        <div class="footer">
          <p>Kibagabaga, Kigali, Rwanda</p>
          <p>© ${new Date().getFullYear()} Amahoro Luxury Villa. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    data.guestEmail,
    `Payment Confirmed - Amahoro Luxury Villa`,
    html
  );
}

export async function sendAdminNewBookingNotification(booking: BookingEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .alert { background: #e3f2fd; border-left: 4px solid #1565c0; padding: 15px; margin-bottom: 20px; }
        .details { background: #f5f5f5; padding: 15px; }
        .details-row { padding: 5px 0; }
        .cta { background: #8B5A3C; color: white; padding: 12px 24px; text-decoration: none; display: inline-block; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="alert">
          <strong>🔔 New Booking Received!</strong>
        </div>
        
        <div class="details">
          <div class="details-row"><strong>Guest:</strong> ${booking.guestName}</div>
          <div class="details-row"><strong>Email:</strong> ${booking.guestEmail}</div>
          <div class="details-row"><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</div>
          <div class="details-row"><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</div>
          <div class="details-row"><strong>Guests:</strong> ${booking.guestsCount}</div>
          <div class="details-row"><strong>Total:</strong> $${booking.totalAmountUsd.toFixed(2)}</div>
          <div class="details-row"><strong>Status:</strong> Pending Payment</div>
        </div>
        
        <a href="${process.env.SITE_URL}/admin/bookings/${booking.bookingId}" class="cta">View in Dashboard</a>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    ADMIN_EMAIL,
    `New Booking: ${booking.guestName} - ${formatDate(booking.checkIn)}`,
    html
  );
}

export async function sendAdminPaymentNotification(data: PaymentEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .alert { background: #e8f5e9; border-left: 4px solid #2e7d32; padding: 15px; margin-bottom: 20px; }
        .details { background: #f5f5f5; padding: 15px; }
        .details-row { padding: 5px 0; }
        .cta { background: #8B5A3C; color: white; padding: 12px 24px; text-decoration: none; display: inline-block; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="alert">
          <strong>💰 Payment Received: $${data.amountPaid.toFixed(2)}</strong>
        </div>
        
        <div class="details">
          <div class="details-row"><strong>Guest:</strong> ${data.guestName}</div>
          <div class="details-row"><strong>Booking:</strong> ${data.bookingId.slice(0, 8).toUpperCase()}</div>
          <div class="details-row"><strong>Amount Paid:</strong> $${data.amountPaid.toFixed(2)}</div>
          <div class="details-row"><strong>Status:</strong> ${data.isFullyPaid ? 'Fully Paid' : 'Deposit Paid'}</div>
          ${!data.isFullyPaid ? `<div class="details-row"><strong>Balance Due:</strong> $${data.balanceDue.toFixed(2)}</div>` : ''}
        </div>
        
        <a href="${process.env.SITE_URL}/admin/bookings/${data.bookingId}" class="cta">View Booking</a>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    ADMIN_EMAIL,
    `Payment Received: $${data.amountPaid.toFixed(2)} from ${data.guestName}`,
    html
  );
}

export async function sendBalanceReminder(data: PaymentEmailData, daysUntilCheckIn: number) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #8B5A3C; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #8B5A3C; }
        .content { padding: 30px 0; }
        .details { background: #f9f5f1; padding: 20px; margin: 20px 0; }
        .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .details-row:last-child { border-bottom: none; }
        .cta-box { text-align: center; margin: 30px 0; }
        .cta-button { background: #8B5A3C; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; display: inline-block; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
        .urgent { color: #c62828; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Amahoro Luxury Villa</div>
          <p>Upcoming Stay Reminder</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.guestName},</p>
          
          <p>We're looking forward to your upcoming stay at Amahoro Luxury Villa in ${daysUntilCheckIn} days!</p>
          
          <p>This is a friendly reminder regarding the remaining balance for your booking.</p>
          
          <div class="details">
            <div class="details-row">
              <span>Booking Reference:</span>
              <strong>${data.bookingId.slice(0, 8).toUpperCase()}</strong>
            </div>
            <div class="details-row">
              <span>Check-in:</span>
              <strong>${formatDate(data.checkIn)}</strong>
            </div>
            <div class="details-row">
              <span>Total Amount:</span>
              <strong>$${data.totalAmountUsd.toFixed(2)}</strong>
            </div>
            <div class="details-row">
              <span>Amount Paid:</span>
              <strong>$${(data.totalAmountUsd - data.balanceDue).toFixed(2)}</strong>
            </div>
            <div class="details-row">
              <span>Remaining Balance:</span>
              <strong class="urgent">$${data.balanceDue.toFixed(2)}</strong>
            </div>
          </div>
          
          <div class="cta-box">
            <p>Please complete your payment before check-in to ensure a smooth arrival.</p>
            <a href="${process.env.SITE_URL}/pay-balance/${data.bookingId}" class="cta-button">Pay Remaining Balance</a>
          </div>
          
          <p>If you have already made this payment or have questions, please reach out to us.</p>
          
          <p>Warm regards,<br>Amahoro Luxury Villa Team</p>
        </div>
        
        <div class="footer">
          <p>Kibagabaga, Kigali, Rwanda</p>
          <p>© ${new Date().getFullYear()} Amahoro Luxury Villa. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    data.guestEmail,
    `Reminder: Your stay at Amahoro Luxury Villa is in ${daysUntilCheckIn} days`,
    html
  );
}

export async function sendPreArrivalInfo(data: BookingEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #8B5A3C; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #8B5A3C; }
        .content { padding: 30px 0; }
        .welcome-hero { background: #8B5A3C; color: white; padding: 40px 20px; text-align: center; margin-bottom: 30px; }
        .guide-section { margin-bottom: 30px; border-left: 2px solid #8B5A3C; padding-left: 20px; }
        .guide-section h3 { color: #8B5A3C; margin-top: 0; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Amahoro Luxury Villa</div>
        </div>
        
        <div class="welcome-hero">
          <h1>Welcome to Kigali!</h1>
          <p>We're getting everything ready for your stay.</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.guestName},</p>
          
          <p>Your stay at Amahoro Luxury Villa is just around the corner. To make your arrival as smooth as possible, please find some helpful information below.</p>
          
          <div class="guide-section">
            <h3>📍 Getting Here</h3>
            <p><strong>Address:</strong> Kibagabaga, Kigali, Rwanda</p>
            <p>You can find us on Google Maps by searching for "Amahoro Luxury Villa".</p>
          </div>
          
          <div class="guide-section">
            <h3>⏰ Arrival & Departure</h3>
            <p><strong>Check-in:</strong> After 3:00 PM</p>
            <p><strong>Check-out:</strong> By 11:00 AM</p>
            <p>If you need an early check-in, please let us know and we will do our best to accommodate based on availability.</p>
          </div>
          
          <div class="guide-section">
            <h3>🔑 Entry Instructions</h3>
            <p>Our House Manager will be there to welcome you and provide a tour of the villa. Please share your approximate arrival time via WhatsApp.</p>
          </div>
          
          <div class="guide-section">
            <h3>🏡 House Rules</h3>
            <p>A few quick reminders:</p>
            <ul>
              <li>Quiet hours: 10 PM – 7 AM</li>
              <li>No smoking inside the villa</li>
              <li>Small gatherings require prior approval</li>
            </ul>
          </div>
          
          <p>We look forward to meeting you soon!</p>
          
          <p>Warm regards,<br>Toby & The Amahoro Team</p>
        </div>
        
        <div class="footer">
          <p>Kibagabaga, Kigali, Rwanda</p>
          <p>© ${new Date().getFullYear()} Amahoro Luxury Villa. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(
    data.guestEmail,
    `Important Stay Information - Amahoro Luxury Villa`,
    html
  );
}
