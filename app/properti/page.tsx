import { Metadata } from 'next'
import PropertyListClient from './page.client'

export const metadata: Metadata = {
  title: 'Jual Beli Properti Premium Jakarta Selatan | Rumah, Apartemen, Ruko',
  description: 'Jual beli dan sewa properti premium di Jakarta Selatan. Koleksi lengkap rumah, apartemen, dan ruko di lokasi strategis dengan harga terbaik.',
  keywords: [
    'jual rumah jakarta selatan',
    'beli properti jaksel',
    'sewa apartemen premium',
    'ruko dijual jakarta selatan',
    'properti mewah kemang',
    'rumah dijual pondok indah',
    'apartemen kebayoran baru'
  ]
}

export default function Page() {
  return <PropertyListClient />
}