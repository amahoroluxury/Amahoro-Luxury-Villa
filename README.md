# Amahoro Luxury Villa

Welcome to the official repository for **Amahoro Luxury Villa**, a premium vacation rental website designed to provide a seamless booking experience and elegant presentation for a high-end villa in Rwanda.

## 🌟 Overview

Amahoro Luxury Villa is a bespoke web application built with modern technologies to offer luxury villa management and booking services. It features a stunning, glassmorphic UI, real-time booking capabilities, and a comprehensive administrative dashboard.

## ✨ Key Features

- **Elegant UI/UX**: A premium design with smooth animations using Framer Motion and modern CSS.
- **Real-time Booking**: Integrated booking system with date blocking and availability checks.
- **Secure Payments**: Integrated with **Flutterwave** for secure deposit and full payment processing.
- **Admin Dashboard**: Comprehensive management interface for bookings, settings, and site content.
- **Email Notifications**: Automated email confirmations for guests and administrators.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with [CSS Modules](https://github.com/css-modules/css-modules), [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon.tech](https://neon.tech/))
- **Payments**: [Flutterwave API](https://flutterwave.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/amahoro-luxury-villa.git
   cd amahoro-luxury-villa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and populate it based on `.env.example`.

4. **Initialize Database**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📄 License

Internal use only for Amahoro Luxury Villa.

---

Built with ❤️ by [Amahoro Luxury Villa Team](https://amahoroluxuryvilla.com)
