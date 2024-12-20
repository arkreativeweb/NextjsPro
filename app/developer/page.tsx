import { Metadata } from 'next'
import DeveloperList from './DeveloperList'

export const metadata: Metadata = {
  title: 'Developer Properti Premium Jakarta Selatan | Rumah & Apartemen Mewah',
  description: 'Daftar developer properti terkemuka di Jakarta Selatan. Temukan developer terpercaya dengan portofolio proyek premium dan prestise.',
  keywords: [
    'developer properti jakarta selatan',
    'developer properti premium',
    'developer rumah mewah',
    'developer apartemen premium',
    'developer terpercaya jakarta selatan',
    'proyek properti premium',
    'developer properti terbaik',
    'developer hunian mewah'
  ],
  openGraph: {
    title: 'Developer Properti Premium Jakarta Selatan',
    description: 'Koleksi eksklusif developer properti terkemuka dengan portofolio proyek mewah dan prestise',
    images: [
      {
        url: '/images/luxury-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Developer Properti Premium Jakarta Selatan'
      }
    ],
    type: 'website',
    locale: 'id_ID',
    siteName: 'Properti Premium Jakarta Selatan'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function Page() {
  return <DeveloperList />
}