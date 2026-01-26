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
              <span>50% Deposit Required:</span>
              <strong>$${booking.depositAmountUsd.toFixed(2)}</strong>
            </div>
          </div>
          
          <div class="note">
            <strong>Next Step:</strong> Please complete your 50% deposit payment to confirm your booking. 
            The remaining balance must be paid before check-in.
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
          <div class="details-row"><strong>Status:</strong> Pending Deposit Payment</div>
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
