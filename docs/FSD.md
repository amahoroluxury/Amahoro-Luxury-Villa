# FUNCTIONAL SPECIFICATION DOCUMENT (FSD)

 Amahoro Luxury Villa  — Website + Online Booking + Payments (Flutterwave)

Project Name:  Amahoro Luxury Villa  Website & Booking Platform
Client:  Amahoro Luxury Villa  (Toby Jackson)
Developer: GetRwanda Ltd (#TeamGet)
Currency: USD
Calendar: Manual (MVP), Sync in future
Payment Rule: 50% deposit minimum to confirm; remaining balance must be paid before check-in (online/offline)

1. Project Overview
 Amahoro Luxury Villa  is a luxury short-term rental villa in Kigali, Rwanda. The client requires a premium, modern website inspired by high-end hospitality aesthetics (e.g., [Le Collectionist](https://www.lecollectionist.com/en)) with smooth navigation and a photo-led or Video-led design.

The website must enable guests to:
• Explore the villa (rooms, amenities, gallery, location)
• Check availability via calendar
• Book online
• Pay securely using Flutterwave
• Pay at least 50% deposit to confirm a booking
• Pay remaining balance before check-in (online or offline)
2. Objectives & Success Metrics
Business Objectives:
• Increase direct bookings (reduce dependency on OTAs like Airbnb)
• Provide a luxury digital presence aligned with premium pricing
• Enable secure online payments for international clients
• Simplify booking management through an admin dashboard

Success Metrics (KPIs):
• Booking conversion rate (visitor → booking)
• % bookings paid online (deposit + balance)
• Reduced inquiry time (faster confirmations)
• Low booking errors (date conflicts, payment mismatch)
• Mobile usability score (fast + clean experience)
3. Target Users & Personas
Guest Users (Public):
• International travelers
• Diaspora visitors
• Families & groups (up to 8 guests)
• Business travelers

Admin Users (Internal):
• Villa Manager / Host
• Operations staff
• Site admin (GetRwanda support)
4. Information Architecture (Site Map)
Public Pages:

1. Home
2. About
3. Rooms / Suites
4. Amenities
5. Gallery
6. Location
7. Reviews
8. FAQ
9. Contact
10. Book Now (Calendar → Guest details → Payment)

Utility Pages:
• Privacy Policy
• Terms & Conditions
• Booking & Payment Policy
• Cancellation & Refund Policy
5. Design & Branding Requirements
Visual Style:
• Luxury, minimal, photo-led
• Calm and warm tones
• Elegant typography + spacing
• Smooth animations (fade-in / staggered transitions)

Color Palette:
• Primary: Espresso Brown (approx. #8B5A3C)
• Backgrounds: Soft Cream (#F4EDE3), White (#FFFFFF)
• Accents: Charcoal Gray (#3A3A3A)

Typography:
• Headings: Serif (Playfair Display / Cormorant)
• Body: Sans-serif (Inter / Lato)
• Buttons: uppercase, spaced letters

Layout Principles:
• Full-width hero images
• Clear CTA: BOOK YOUR STAY
• Mobile-first responsive design
• Gallery masonry layout
• FAQ accordion component
• Review cards layout
6. Functional Requirements (Public Website)
6.1 Home Page
Purpose: Showcase villa, create trust, drive booking.
Components:
• Hero image + title + subtitle
• CTA button “Book Your Stay”
• Quick highlights (4 bedrooms, terraces, garden, chef option, security)
• Featured gallery section
• Reviews preview section
• Location preview (short map/area mention)
• Footer with socials + business links

6.2 About Page
Purpose: Brand story + cultural identity.
Components:
• “ Amahoro Luxury Villa  means peace…” story section
• Villa mission + hospitality promise
• Photo sections (interior details + exterior)

6.3 Rooms / Suites Page
Purpose: Room descriptions and features.
Components:
• Room cards or alternating sections: Master Suite, Bedroom 2, Bedroom 3, Bedroom 4
• Amenities list per room
• “Book Now” CTA

6.4 Amenities Page
Purpose: Show comfort, value, luxury.
Components:
• Grid layout of amenities (icons optional)
• Outdoor living (garden, fire pit, BBQ)
• Kitchen and dining
• WiFi / Smart TVs
• Parking / Security
• Optional chef

6.5 Gallery Page
Purpose: Visual selling.
Components:
• Masonry gallery layout
• Optional filter categories: Living Room, Bedrooms, Kitchen, Outdoor / Garden, Views

6.6 Location Page
Purpose: Help guests understand access + area.
Components:
• Map embed
• Key distances (airport, convention centre, city center)
• Neighborhood mention: Kibagabaga

6.7 Reviews Page
Purpose: Build trust.
Components:
• Review cards (2-column desktop)
• Name + rating + review text

6.8 FAQ Page
Purpose: Reduce support load.
Components:
• Accordion questions (airport pickup, early check-in, events, payments, security deposit, cancellation)

6.9 Contact Page
Purpose: Inquiries + conversions.
Components:
• Contact form (name, email/phone, message)
• WhatsApp chat link
• Phone number
• Email address
• Social links (IG, FB)
• “Book Now” CTA
7. Booking System (Core Product Feature)
Booking Flow (Guest Journey):
Step 1: Select dates (check-in, check-out)
Step 2: Guest details (name, email, phone, guests, special requests)
Step 3: Price breakdown (per night, number of nights, optional fees, total)
Step 4: Payment selection (Pay 50% deposit OR Pay 100% full amount)
Step 5: Confirmation (booking reference, email sent, calendar blocked)

Pricing Rules:
• Pricing is per night (USD)
• Total = nightly_rate × number_of_nights (+ optional fees)
• Booking is confirmed only after deposit/full payment is successful
8. Payment System Requirements (Flutterwave)
Payment Processor:
• Flutterwave checkout integration (USD)

Payment Rules:
• Minimum payment to confirm booking = 50%
• Remaining balance must be paid before check-in
• Remaining balance can be paid online (Flutterwave link) or offline (admin marks paid)

Payment Status Handling:
• Payment success → booking status updates automatically
• Payment failure → booking stays “Pending Payment”
• Payment pending → booking not confirmed until verified

Webhooks (Required):
• Flutterwave webhook must notify platform when payment is completed
• Webhook updates booking record (amount, reference, timestamp, status)
9. Calendar & Availability Management
MVP Calendar Mode:
• Manual calendar management by admin
• Admin can add bookings, block dates, edit bookings

Future Enhancement:
• Airbnb calendar sync (iCal import/export)
• Multi-channel sync support
10. Admin Dashboard Requirements
Admin Login:
• Secure admin login page
• Role-based access (optional)

Booking Management:
• View all bookings
• Filter by status (Deposit Paid, Fully Paid, Cancelled)
• View guest details

Payment Management:
• See online payments recorded
• Mark offline payments as received
• Generate payment links for remaining balance

Calendar Management:
• View availability calendar
• Block/unblock dates
• Assign bookings to dates

Content Updates (Basic CMS):
• Update text content
• Update photos (gallery)
• Update rates (nightly price)
• Update policies pages
11. Email Notifications
Guest Emails:
• Booking confirmation (deposit paid)
• Full payment confirmation
• Balance reminder email (optional automated)
• Cancellation email

Admin Emails:
• New booking notification
• Payment received notification
12. Policies & Legal Pages (Must Include)
• Booking Policy (check-in/out, ID requirement)
• Payment Policy (50% deposit, balance before check-in)
• Cancellation & Refund Policy (refund windows, no-show rules)
• House Rules (quiet hours, events, smoking, damages)
13. SEO & Performance Requirements
SEO Setup:
• SEO-friendly URLs
• Page titles + meta descriptions
• Image optimization (alt text)
• Sitemap generation
• Google indexing readiness

Performance:
• Compressed images + lazy loading
• Mobile performance optimized
• Core Web Vitals best practices
14. Non-Functional Requirements
Security:
• SSL enabled (HTTPS)
• Secure admin access
• Secure payment processing (Flutterwave)

Compatibility:
• Mobile responsive
• Cross-browser support (Chrome, Safari, Firefox, Edge)

Reliability:
• Prevent booking date conflicts
• Prevent payment mismatch issues
• Backups enabled (hosting dependent)
15. Testing & QA Checklist
Functional Testing:
• All pages load correctly
• Forms submit successfully
• Booking flow works end-to-end
• Payment success updates booking
• Payment failure handled properly
• Calendar blocks correct dates

UX Testing:
• Mobile usability
• CTA visibility
• Smooth navigation

Security Testing:
• Admin login protection
• Payment link security
16. Deliverables
• Fully responsive website
• Booking system + calendar
• Flutterwave payments
• Admin dashboard
• Policies pages
• SEO basics setup
• Deployment + SSL enabled
• 31 days support after delivery
17. Future Enhancements (Phase 2+)
• Airbnb iCal sync
• Multi-language (EN/FR optional)
• Automated balance reminders
• Add-ons upsells (airport pickup, chef, tours)
• Dynamic pricing (weekend/seasonal)
• CRM integration (Mailchimp)
18. Acceptance Criteria
Project is accepted when:
• Website matches luxury aesthetic and brand guide
• Booking system works reliably
• Flutterwave deposit and full payment works
• Admin can manage bookings + calendar manually
• Balance can be marked paid offline or paid online
• Policies pages exist and are visible
• Site is live with SSL and tested
