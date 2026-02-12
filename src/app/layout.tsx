import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LoadingWrapper from "@/components/LoadingWrapper";
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
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Amahoro Luxury Villa | A Sanctuary of Peace in Kigali",
    template: "%s | Amahoro Luxury Villa"
  },
  description: "Amahoro Luxury Villa — Experience Afro-Modern luxury, comfort, and peace in the heart of Kigali. Book your stay at our premium boutique villa.",
  keywords: "luxury villa Kigali, Kibagabaga villa rental, Kigali short-term rental, boutique stay Rwanda, luxury kigali home",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Amahoro Luxury Villa | Luxury Villa Stay in Kigali",
    description: "Experience Afro-Modern luxury at Amahoro Luxury Villa. Kigali's premier stay with world-class amenities.",
    url: "https://www.amahoroluxuryvilla.com",
    siteName: "Amahoro Luxury Villa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amahoro Luxury Villa Exterior",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amahoro Luxury Villa | Luxury Villa Stay in Kigali",
    description: "Experience Afro-Modern luxury at Amahoro Luxury Villa. Kigali's premier stay.",
    images: ["/og-image.jpg"],
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
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  );
}
