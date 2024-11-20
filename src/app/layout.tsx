// src/app/layout.tsx
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import StructuredData from './components/StructuredData';

export const metadata: Metadata = {
  title: 'WHY - Healthy and Affordable Meal Services',
  description: 'Providing fresh, nutritious, and affordable tiffin services to students and professionals across India.',
  keywords: 'meal delivery, tiffin services, healthy meals, affordable meals, student meals, professional meals',
  openGraph: {
    title: 'WHY - Healthy and Affordable Meal Services',
    description: 'Providing fresh, nutritious, and affordable tiffin services to students and professionals across India.',
    url: 'https://www.why.com',
    siteName: 'WHY',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WHY Meal Delivery Service',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WHY - Healthy and Affordable Meal Services',
    description: 'Providing fresh, nutritious, and affordable tiffin services to students and professionals across India.',
    images: ['/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <Navbar />
        <main className="pt-0">
          {/* Added padding-top to account for fixed Navbar */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
