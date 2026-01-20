ANTI-GRAVITY IDE WORKFLOW FRAMEWORK
Amahoro Luxury Villa — Website + Booking + Flutterwave

This document provides a productive, result-oriented workflow for building the Amahoro Luxury Villa platform using Antigravity IDE.
The 3 Rules (Follow These Throughout)
1) Build in layers: UI → Booking → Payments → Admin → Policies → SEO → Launch
2) Always keep the site usable at every stage
3) Every feature must have: UI + Logic + Admin + Tests
PHASE 0 — PROJECT SETUP (Day 0 / 2–3 hours)
0.1 Create your “Single Source of Truth” folder
Create a /docs folder in your project:
- FSD.docx
- Website_Copy.docx
- Policies.md
- Booking_Rules.md
- Payment_Rules.md
- Test_Cases.md

Why: prevents confusion and keeps development fast and consistent.
0.2 Confirm the platform decisions (Lock Scope)
Inside /docs/Booking_Rules.md, store the locked rules:
- Pricing: Per night (USD)
- Deposit: 50% minimum to confirm
- Balance: Must be paid before check-in (online or offline)
- Calendar: Manual now, sync later
0.3 Choose a tech structure (Recommended)
Recommended stack:
- Frontend: Next.js
- Database: PostgreSQL (or Supabase)
- Admin Auth: Simple admin login
- Payments: Flutterwave checkout + webhooks
- Email: SMTP or Resend
PHASE 1 — BUILD THE LUXURY WEBSITE UI FIRST (Day 1–2)
Goal: Deliver a premium marketing website before booking exists.

Pages to build:
- Home
- About
- Rooms
- Amenities
- Gallery
- Location
- Reviews
- FAQ
- Contact

Must-have UI:
- Sticky Book Now button
- Hero CTA “Book Your Stay”
- Smooth animations (fade-in, stagger)
- Gallery masonry layout
- FAQ accordion
- Review cards
- Mobile-first responsive design

Checkpoint:
✓ Client can preview and confirm the luxury look & navigation.
PHASE 2 — BOOKING ENGINE (Day 3–5)
Goal: Make Book Now work end-to-end without payments first.

Booking flow pages:
1) Date selection (check-in/check-out)
2) Guests number
3) Price breakdown
4) Guest details form
5) Booking summary
6) Confirm booking (without payment)

Booking logic:
- Nights calculation
- Prevent invalid date ranges
- Prevent overlapping bookings
- Auto-calculate total, deposit (50%), and remaining balance

Statuses (MVP):
- Pending Deposit
- Deposit Paid (Confirmed)
- Fully Paid
- Cancelled

Checkpoint:
✓ Guest can submit booking request
✓ Booking blocks dates in calendar
✓ Admin can create bookings manually
PHASE 3 — ADMIN DASHBOARD (Day 5–7)
Goal: Ensure the villa team can manage operations.

Admin can:
- View bookings list
- View booking details
- Manually block dates
- Add booking manually
- Change booking status
- Mark offline payments
- Track amounts (total/paid/due)

Admin screens:
- /admin/login
- /admin/bookings
- /admin/bookings/:id
- /admin/calendar

Checkpoint:
✓ Client can operate the booking system without developer support.
PHASE 4 — FLUTTERWAVE PAYMENTS (Day 7–10)
Goal: Enable secure online payments with automation.

Payment flows:
A) Pay 50% deposit → status becomes Deposit Paid (Confirmed)
B) Pay 100% → status becomes Fully Paid
C) Pay remaining balance (before check-in) → status becomes Fully Paid
D) Offline remaining balance → admin marks paid → Fully Paid

Critical requirement: Webhooks
- Validate transaction
- Confirm amount matches expected
- Update booking record
- Send confirmation email

Checkpoint:
✓ Booking status updates automatically after payment
✓ Payment mismatch is blocked
PHASE 5 — POLICIES + LEGAL + TRUST (Day 10–11)
Goal: Protect the business and reduce disputes.

Pages to publish:
- Booking & Payment Policy
- Cancellation & Refund Policy
- House Rules
- Privacy Policy

Must include:
- Remaining balance must be paid before check-in.

Checkpoint:
✓ Guests understand rules and booking terms clearly.
PHASE 6 — SEO + PERFORMANCE + ANALYTICS (Day 11–12)
SEO checklist:
- Page titles & meta descriptions
- Clean URLs
- Image alt text
- Sitemap
- Robots.txt
- OpenGraph preview image

Performance:
- Lazy-load images
- Compress images
- Mobile speed optimization

Tracking:
- Google Analytics/Tag Manager
- Conversion event = booking confirmed

Checkpoint:
✓ Site is Google-ready and fast on mobile.
PHASE 7 — FINAL QA + LAUNCH (Day 13–14)
Final test cases:
Booking tests:
- Invalid date ranges
- Overlapping bookings
- Manual blocked dates

Payment tests:
- Deposit success
- Full payment success
- Payment failure
- Webhook delayed
- Remaining balance payment success
- Offline payment marking

Email tests:
- Booking confirmation
- Payment confirmation
- Balance reminder (optional)

Checkpoint:
✓ You can launch confidently and accept real bookings without errors.
DAILY WORKFLOW INSIDE ANTI-GRAVITY IDE (Execution System)
Step 1 (10 min): Define today’s outcome
Example: “By end of today, users can select dates and see total price.”

Step 2 (15 min): Break into 3 tasks max
Example:
1) Create booking price calculator
2) Save booking in DB
3) Show booking in admin list

Step 3: Build UI → Logic → Test
Step 4 (5 min): End-of-day demo checklist
- Test on mobile
- Run 1 booking flow
- Check admin panel
- Confirm DB updated
DON’T GET STUCK — RECOVERY PLAN
If UI is stuck → use static dummy data
If payment is stuck → simulate webhook updates (dev-only)
If admin is stuck → build read-only first, then add editing
Suggested Antigravity Prompt Template
Copy/paste into Antigravity IDE:

You are building Amahoro Luxury Villa, a luxury villa booking website in Kigali.
Build the following module: [MODULE NAME].
Requirements:
- Luxury minimalist UI inspired by Le Collectionist
- Mobile-first responsive
- Use the existing website copy and layout rules
- Booking rules: per-night USD pricing, 50% deposit minimum, remaining balance paid before check-in, manual calendar
- Add admin management where required
Deliverables:
- UI components
- Backend logic/API
- Database schema updates
- Validation and error handling
- Basic tests
Make it production-ready.
Recommended Build Order (Fastest Perfect Order)
1) Marketing pages + design system
2) Booking UI + date logic
3) DB + calendar blocking
4) Admin dashboard
5) Flutterwave deposit/full payments
6) Remaining balance payment link
7) Policies + SEO + launch
