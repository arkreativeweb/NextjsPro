// app/layout.tsx
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css'; // Jika Anda memiliki file CSS global

export const metadata: Metadata = {
  title: {
    default: 'Properti Jakarta Selatan | Rumah, Apartemen, Ruko Premium',
    template: '%s | Properti Premium Jakarta Selatan'
  },
  description: 'Temukan properti premium di Jakarta Selatan. Spesialis jual beli & sewa rumah, apartemen, ruko di area Kemang, Pondok Indah, Kebayoran Baru, dan sekitarnya.',
  keywords: [
    'rumah jakarta selatan',
    'properti jakarta selatan',
    'jual rumah jakarta selatan',
    'sewa apartemen jakarta selatan',
    'ruko jakarta selatan',
    'properti premium jaksel',
    'rumah mewah kemang',
    'apartemen pondok indah',
    'properti kebayoran baru'
  ],
  authors: [{ name: 'Your Company Name' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://yourwebsite.com',
    siteName: 'Properti Premium Jakarta Selatan',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Properti Premium Jakarta Selatan'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/images/logo.png" 
          as="image" 
          type="image/png" 
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
