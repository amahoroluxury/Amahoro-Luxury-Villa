ANTI-GRAVITY IDE MASTER PROMPT
 Amahoro Luxury Villa  — Website + Booking + Flutterwave


MASTER PROMPT (COPY/PASTE INTO ANTIGRAVITY IDE)
You are an expert full-stack engineer and product designer building a luxury villa booking platform.

PROJECT NAME
 Amahoro Luxury Villa  — Luxury Website + Booking + Payments (Flutterwave)

PROJECT GOAL
Build a premium, conversion-focused website for  Amahoro Luxury Villa  in Kigali, Rwanda, inspired by Le Collectionist aesthetics : https://www.lecollectionist.com/ (luxury minimalism, photo-led design, smooth navigation), with a complete booking system and secure payments.

The platform must be fast, mobile-first, SEO-ready, and easy for admins to manage.

1) CORE REQUIREMENTS (DO NOT SKIP)

1.1 Visual / UX Style
- Luxury, minimal, calm, photo-led
- Large hero sections, clean typography, generous spacing
- Smooth animations (fade-up / stagger)
- Elegant navigation, easy browsing
- Sticky “BOOK NOW” button on mobile
- Use a warm premium palette:
  - Espresso Brown (#8B5A3C approx.)
  - Soft Cream (#F4EDE3)
  - White (#FFFFFF)
  - Charcoal Gray (#3A3A3A)
- Typography:
  - Headings: Playfair Display or Cormorant (serif)
  - Body: Inter or Lato (sans-serif)
  - Buttons: ALL CAPS + letter spacing

1.2 Website Pages (Public)
Build these pages with responsive layout + clean UI:
- Home
- About
- Rooms / Suites
- Amenities
- Gallery (masonry layout)
- Location (map + distances)
- Reviews (cards)
- FAQ (accordion)
- Contact (form + WhatsApp link)
- Book Now (booking flow)

1.3 Booking Rules (MUST IMPLEMENT)
- Pricing is per night
- Currency: USD
- Calendar is manual for now
- Reservation payment:
  - Guest pays at least 50% deposit OR 100% full
- Remaining balance:
  - Must be paid before check-in
  - Can be paid online or offline
- Booking is only eligible for check-in when status is Fully Paid

1.4 Payment Processor
- Integrate Flutterwave for online payments
- Implement webhooks to confirm payment and update booking status
- Support:
  - Deposit payment (50%)
  - Full payment (100%)
  - Remaining balance payment (50% after deposit)
- Admin must be able to mark offline payments as paid

1.5 Admin Dashboard (MVP)
Create a secure admin area:
- Admin login
- Bookings list + filters
- Booking detail view
- Manual calendar view
- Block/unblock dates
- Add booking manually
- Mark payments (offline)
- Generate “Pay Remaining Balance” link for guests
- View payment status and totals

1.6 Emails / Notifications (MVP)
Send email notifications:
- Guest booking confirmation after deposit/full payment
- Payment confirmation after successful payment
- Admin notification on new booking
- Optional: balance reminder email (if balance not paid)

1.7 Policies Pages (MUST INCLUDE)
Create website-ready policy pages:
- Booking & Payment Policy (include 50% deposit + balance before check-in)
- Cancellation & Refund Policy (reasonable and clear)
- House Rules (quiet hours, events, smoking, ID requirement, damage deposit)
- Privacy Policy

1.8 SEO + Performance
- SEO-friendly URLs
- Meta titles and descriptions per page
- Image alt tags
- Sitemap + robots.txt
- OpenGraph tags
- Lazy loading for images
- Optimize for mobile performance

2) WEBSITE COPY (USE THIS EXACT CONTENT WHERE PROVIDED)

Home Page — Hero Section (CLIENT PROVIDED)
Headline: A Sanctuary of Peace in the Heart of Kigali
Sub-headline: Experience Afro-Modern luxury, comfort, and unforgettable hospitality.
CTA Button: Book Your Stay

Brand Overview (CLIENT PROVIDED)
 Amahoro Luxury Villa  is for couples, families and friends to relax, and reconnect. It offers private indoor/outdoor living, a rare find in Kigali. Have a local chef prepare an outdoor barbecue or an intimate dinner in a spacious modern home with views facing the hills of Kigali.

Value Proposition (CLIENT PROVIDED)
- 4 bedrooms and 4 baths
- Full eat in Chef’s kitchen with expresso coffee bar
- Two levels of outdoor terraces facing evening sunsets over the Kigali hills
- Outdoor kitchen with grille and a fire pit set in a large tropical garden rarely found in Kigali
- Security and house manager on site
- Minutes from popular neighborhood restaurants, the stadiums and City Center
- We accept monthly rentals

About Page (CLIENT PROVIDED)
 Amahoro Luxury Villa  means peace in Kinyarwanda. It embodies the spirit of calm that defines our villa. We celebrate Rwandan culture through the craftsmanship that went into building and furnishing the home. The space is intended to have the luxury feel of a 5-star hotel and the comfort and privacy of a home. Our mission is to complement your stay with the level of service that will make your experience memorable.

Rooms & Suites (CLIENT PROVIDED)
MASTER SUITE:
- King bed
- Ensuite bath
- Balcony views
- Walk out to the terrace
- Spa bath with soaker tub

BEDROOM 2:
- Queen bed
- Ensuite bathroom
- Sliding doors to patios (with mosquito nets)
- Whisper quiet ceiling fans for additional ventilation

BEDROOM 3:
- Queen bed
- Ensuite bathroom
- Sliding doors to patios (with mosquito nets)
- Whisper quiet ceiling fans for additional ventilation

BEDROOM 4:
- Full bed
- Workspace desk
- Sliding door to the patio
- Ensuite bathrooms

All rooms include: premium bedding, wardrobe space, blackout curtains, and modern lighting.

Amenities (CLIENT PROVIDED)
- Outdoor chairs for lounging + tables for alfresco dining
- Full kitchen with chef-grade appliances
- High-speed fiber WiFi
- Smart TVs in living areas
- On-site parking
- Security system
- Laundry room
- Optional private chef (request)

Location (CLIENT PROVIDED)
Located in the upscale community of Kibagabaga,  Amahoro Luxury Villa  is surrounded by top-rated restaurants, gyms, pharmacies, hospitals, and supermarkets. Only 15 minutes from Kigali International Airport and 12 minutes from Kigali Convention Centre.

FAQ (CLIENT PROVIDED)
Q: Is airport pickup available?
A: Yes, with advance notice.

Q: Is early check-in allowed?
A: Based on availability. Request before departure for availability.

Q: Are events allowed?
A: Small gatherings are permitted with approval and a 10pm outdoor curfew.

Policies (CLIENT PROVIDED)
- Check-in: 3 PM
- Check-out: 11 AM
- No parties or unauthorized events
- Quiet hours: 10 PM – 7 AM
- ID required for booking
- No smoking inside the villa
- Damage deposit required

SEO (CLIENT PROVIDED)
Primary Keywords: luxury villa Kigali, Kibagabaga villa rental, Kigali short-term rental
Meta Description:  Amahoro Luxury Villa  — Kigali’s premier luxury short-term rental home. Book your stay today.

3) BOOKING FLOW UX (MUST BUILD)

Booking Steps
1) Select check-in and check-out dates
2) Select number of guests (max 8)
3) Show price breakdown:
   - Nightly rate × nights
   - Total
   - Deposit due now (50%)
   - Remaining balance due before check-in
4) Collect guest details:
   - Full name
   - Email
   - Phone (with country code)
   - Special requests
5) Payment options:
   - Pay 50% deposit
   - Pay full amount
6) Confirmation page with booking reference + email confirmation

4) DATABASE + BACKEND REQUIREMENTS

Entities
Create a clean schema for:
- Booking
- PaymentTransaction
- BlockedDates (manual calendar blocks)
- AdminUser (if not using managed auth)

Booking fields (minimum)
- id
- guest_name
- guest_email
- guest_phone
- check_in_date
- check_out_date
- guests_count
- total_amount_usd
- deposit_amount_usd
- amount_paid_usd
- balance_due_usd
- status (PendingDeposit, DepositPaid, FullyPaid, Cancelled)
- payment_status (Unpaid, Partial, Paid)
- created_at

PaymentTransaction fields (minimum)
- id
- booking_id
- flutterwave_tx_ref
- flutterwave_transaction_id
- amount_usd
- type (deposit, full, balance)
- status (pending, success, failed)
- created_at

Backend APIs
Create endpoints for:
- Create booking
- Check availability
- Block dates (admin)
- Initiate Flutterwave payment
- Flutterwave webhook handler
- Mark offline payment (admin)
- Generate balance payment link

5) SECURITY + VALIDATION RULES
- Prevent double-booking (no overlap with existing bookings or blocked dates)
- Validate amounts (deposit must be exactly 50% or allow >=50%)
- Webhook must verify payment authenticity before updating booking
- Admin routes must be protected

6) DELIVERABLES (WHAT YOU MUST OUTPUT)
Generate:
1) Full project codebase with clean structure
2) UI components for all pages
3) Booking flow + calendar logic
4) Admin dashboard
5) Flutterwave integration + webhook
6) Policy pages
7) SEO setup
8) Seed/demo data for testing
9) Clear README with setup instructions:
   - install
   - env variables
   - run locally
   - deploy

7) ENVIRONMENT VARIABLES (CREATE TEMPLATE)
Create a .env.example including:
- DATABASE_URL
- FLUTTERWAVE_PUBLIC_KEY
- FLUTTERWAVE_SECRET_KEY
- FLUTTERWAVE_ENCRYPTION_KEY (if needed)
- FLUTTERWAVE_WEBHOOK_HASH (if applicable)
- SITE_URL
- EMAIL_PROVIDER_API_KEY or SMTP settings
- ADMIN_EMAIL / ADMIN_PASSWORD (if using basic auth)

8) FINAL QUALITY REQUIREMENTS
Before final output:
- Ensure mobile responsiveness
- Ensure booking flow works end-to-end
- Ensure deposit + full + balance payments work
- Ensure admin can mark offline payments
- Ensure status updates are correct
- Ensure policies include “balance must be paid before check-in”
- Ensure no placeholder lorem ipsum exists

NOW BUILD THE COMPLETE PLATFORM WITH PRODUCTION-READY CODE AND A CLEAN, PREMIUM UI.