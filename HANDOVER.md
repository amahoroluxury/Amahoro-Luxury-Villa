# Amahoro Luxury Villa — Technical Handover

This document is for whoever maintains the site after GetRwanda (#TeamGet). It
covers how the application is put together, how to run and deploy it, which
external accounts it depends on, and the known issues at handover. Read it
together with `README.md` (local setup) and `.env.example` (every variable).

Live site: https://www.amahoroluxuryvilla.com
Admin: https://www.amahoroluxuryvilla.com/admin/login

## 1. What the application is

A Next.js 14 (App Router, TypeScript) application that serves both the public
website and the booking/admin back end. There is no separate API server: every
server-side piece is a Next.js route under `src/app/api/`.

| Layer | Technology | Where in the repo |
| --- | --- | --- |
| Pages (public site) | Next.js App Router, React 18, Framer Motion, CSS | `src/app/(site)/`, `src/components/`, `src/styles/` |
| Admin dashboard | Next.js pages behind a cookie check | `src/app/admin/`, `src/middleware.ts` |
| API routes | Next.js route handlers | `src/app/api/` |
| Database | PostgreSQL on Neon, accessed through Prisma 5 | `prisma/schema.prisma`, `src/lib/prisma.ts` |
| Payments | DPO Pay (see §5, read before touching) | `src/lib/dpo.ts`, `src/app/api/payment/` |
| Email | Resend | `src/lib/email.ts` |
| Image uploads | Cloudinary | `src/lib/cloudinary.ts`, `src/app/api/admin/upload/` |
| Airbnb calendar sync | iCal feed parsed with `ical.js` | `src/lib/ical.ts`, `src/lib/booking-logic.ts` |
| Scheduled reminders | Vercel Cron, daily at 06:00 UTC | `vercel.json`, `src/app/api/admin/reminders/trigger/route.ts`, `src/lib/notification-engine.ts` |
| Hosting | Vercel, deploys from GitHub `main` | — |

### Database tables (Prisma models)

`Booking`, `PaymentTransaction`, `BlockedDate`, `Admin`, `Settings` (single row,
id `site-settings`: nightly rate, weekend rate, deposit %, RWF rate, Airbnb iCal
URL), `GalleryImage`. The schema is the source of truth; there is no migrations
folder, the schema is applied with `npx prisma db push`.

## 2. How a booking flows

1. Guest picks dates on `/book`. `GET /api/availability` checks `Booking` and
   `BlockedDate` (including dates pulled from the Airbnb iCal feed) and
   `GET /api/availability/price` applies the nightly/weekend rates from `Settings`.
2. `POST /api/booking` creates a `Booking` with status `PendingDeposit`.
3. `POST /api/payment/initialize` creates a `PaymentTransaction` and asks the
   gateway for a payment URL; the guest is redirected there.
4. The gateway calls back `POST /api/payment/webhook` (server-to-server) and the
   guest is redirected to `/book/payment/verify`, which calls
   `GET /api/payment/verify`. Either path marks the transaction `success`,
   updates `amountPaidUsd` / `balanceDueUsd` on the booking and moves the status
   to `DepositPaid` or `FullyPaid`.
5. Confirmation emails go to the guest and to `ADMIN_EMAIL` through Resend.
6. Daily at 06:00 UTC the cron hits `/api/admin/reminders/trigger`, which sends
   the 7-day and 2-day stay/balance reminders and the 3-day pre-arrival guide.
   `Booking.remindersSent` records which ones went out so none is sent twice.
7. A guest with an outstanding balance pays it at `/pay-balance/[id]`; the admin
   can also mark a booking paid or generate a payment link from the dashboard.

## 3. Running locally

```bash
npm install
cp .env.example .env      # fill in at least DATABASE_URL and DIRECT_URL
npx prisma db push        # creates the tables
npx prisma db seed        # creates Settings + the default admin user
npm run dev               # http://localhost:3000
```

Without `RESEND_API_KEY` emails are printed to the console instead of sent.
Without DPO credentials the payment step will fail at `initialize`; the rest of
the site works. Gallery upload needs the three Cloudinary variables.

## 4. Deploying

- Production deploys automatically on every push to `main` (Vercel Git
  integration). A deploy takes about two minutes.
- Pull requests get a preview URL from Vercel.
- Roll back from the Vercel dashboard (Deployments → ⋯ → Promote to Production).
- Environment variables live in the Vercel project settings, never in the repo.
  `.env.example` lists all of them.
- `vercel.json` defines the daily cron. A Hobby-plan Vercel team allows one
  cron per day, which is what this uses. If a deploy is rejected after changing
  `vercel.json`, check the cron schedule first.

## 5. Payments — read before changing anything

The code path that runs today is **DPO Pay**:

- `src/lib/dpo.ts` builds the DPO `createToken` / `verifyToken` XML requests.
- `src/app/api/payment/initialize`, `verify` and `webhook` all call `dpo`.
- It reads `DPO_COMPANY_TOKEN`, `DPO_SERVICE_TYPE`, `DPO_ENVIRONMENT`.

The Vercel project, the February 2026 delivery report and `README.md` refer to
**Flutterwave**, and the Vercel project holds `FLUTTERWAVE_*` keys. The current
code does not read those keys. The DPO variables are not set on Vercel at the
time of handover, so the live payment flow should be tested end to end before
relying on it.

Decision at handover (10 November 2026): leave payments exactly as they are.
Whoever changes this should first confirm with the client which merchant
account (DPO or Flutterwave) is theirs, then set that gateway's variables and
remove the other's dead code and keys in one change.

## 6. External accounts the site depends on

| Service | Used for | Variables | Owner at handover |
| --- | --- | --- | --- |
| GitHub | Source code, triggers deploys | — | Transferred to the client |
| Vercel | Hosting, cron, environment variables | all | Client's Vercel team |
| Neon | PostgreSQL database | `DATABASE_URL`, `DIRECT_URL` | Client's Neon account |
| Wix | Domain registrar and DNS for `amahoroluxuryvilla.com` (DNS points at Vercel; the Wix site itself is unused) | — | Client |
| Resend | Transactional email from `bookings@amahoroluxuryvilla.com` | `RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL` | See access sheet |
| Cloudinary | Gallery image storage | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | See access sheet |
| DPO Pay / Flutterwave | Payments (§5) | `DPO_*` / `FLUTTERWAVE_*` | See access sheet |
| Airbnb | iCal feed URL pasted into Admin → Settings | stored in the `Settings` table | Client |

Logins and recovery details are in the separate access sheet given to the
client; they are never stored in this repository.

## 7. Admin dashboard

- Login at `/admin/login` with the email/password stored (bcrypt-hashed) in the
  `Admin` table. The seed creates `admin@amahoroluxuryvilla.com`; **change the
  seeded password before go-live** (Admin → or directly in the database).
- `src/middleware.ts` protects `/admin/*` and `/api/admin/*` by checking the
  `admin_auth_token` cookie. See Known issues: the check is format-only.
- Settings (rates, deposit %, RWF rate, Airbnb iCal URL, "Sync now") are at
  `/admin/settings`; bookings, calendar and CSV export under `/admin/bookings`
  and `/admin/calendar`.

## 8. Known issues at handover

| Issue | Where | Suggested fix |
| --- | --- | --- |
| Reminder cron was missing from March to November 2026 (`vercel.json` had been deleted while troubleshooting a deploy). Restored in this handover; verify the first deploy succeeds and that the cron appears under Vercel → Settings → Cron Jobs. | `vercel.json` | None beyond verification |
| Resend, Cloudinary, `SITE_URL` and DPO variables were not set on the old Vercel project, so emails, gallery upload and payments did not work in production. | Vercel env | Set every variable in `.env.example` on the new project |
| Admin session cookie is only checked for shape (`amt_` prefix, length > 20); tokens are not stored or signed, so any string of that shape passes the middleware. | `src/middleware.ts`, `src/app/api/admin/auth/route.ts` | Sign the token with `jose` (already a dependency) and verify the signature in the middleware, or store issued tokens in the database |
| Login rate limiter is in-memory, so it resets on every serverless cold start. | `src/app/api/admin/auth/route.ts` | Acceptable for this traffic; move to the database if abuse appears |
| Occasional `Can't reach database server` on the first request after idle. | Neon free-tier compute suspends when idle and cold-starts | Expected on the free plan; upgrade the Neon compute if it becomes a problem |
| `url.parse()` deprecation warning on `/api/calendar/public`. | Node 24 runtime | Cosmetic; replace with `new URL()` when convenient |
| `README.md` still describes Flutterwave as the payment provider. | `README.md` | Update once the payments decision in §5 is made |

## 9. Useful commands

```bash
npm run lint                 # ESLint
npx prisma studio            # browse the database in a local UI
npx prisma db push           # apply schema changes (no migrations folder)
npx prisma generate          # regenerate the client after schema edits
curl -X POST https://www.amahoroluxuryvilla.com/api/admin/reminders/trigger  # run reminders now (needs admin cookie)
```
