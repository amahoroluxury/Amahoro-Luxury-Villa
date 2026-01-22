import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: " Amahoro Luxury Villa  | Luxury Villa Stay in Kigali",
  description: " Amahoro Luxury Villa  — Kigali's premier luxury short-term rental home. Experience Afro-Modern luxury, comfort, and unforgettable hospitality.",
  keywords: "luxury villa Kigali, Kibagabaga villa rental, Kigali short-term rental",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
