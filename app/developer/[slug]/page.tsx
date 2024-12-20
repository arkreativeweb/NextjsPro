import { Metadata } from 'next'
import DeveloperDetail from './DeveloperDetail'

// Fungsi untuk fetch data developer
async function getDeveloper(slug: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/developers/${slug}`, {
      next: { revalidate: 3600 } // Cache selama 1 jam
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching developer:', error);
    return null;
  }
}

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const developer = await getDeveloper(params.slug);
  
  if (!developer) {
    return {
      title: 'Developer Tidak Ditemukan',
      description: 'Maaf, developer yang Anda cari tidak tersedia'
    }
  }

  // Format proyek untuk description
  const projectInfo = `${developer.proyek} proyek prestisius`;
  const yearInfo = `Berdiri sejak ${developer.tahun_berdiri}`;
  const priceInfo = developer.tipe_unit?.length > 0 
    ? `Harga mulai dari ${developer.tipe_unit[0].harga}`
    : '';

  // Buat description yang kaya dengan keyword
  const description = `${developer.nama} - Developer properti premium di ${developer.lokasi}. ${projectInfo}. ${yearInfo}. ${developer.deskripsi?.substring(0, 100)}... ${priceInfo}`;

  return {
    title: `${developer.nama} - Developer Properti Premium ${developer.lokasi}`,
    description,
    keywords: [
      `developer ${developer.lokasi.toLowerCase()}`,
      'developer properti premium',
      'developer properti terpercaya',
      'developer rumah mewah',
      'developer apartemen premium',
      developer.nama.toLowerCase(),
      `${developer.nama.toLowerCase()} ${developer.lokasi.toLowerCase()}`,
      'proyek properti premium',
      'hunian mewah',
      'properti eksklusif'
    ],
    openGraph: {
      title: `${developer.nama} - Developer Properti Premium`,
      description,
      images: [
        {
          url: developer.logo || '/images/developer-placeholder.jpg',
          width: 1200,
          height: 630,
          alt: developer.nama
        }
      ],
      type: 'profile',
      locale: 'id_ID',
      siteName: 'Properti Premium Jakarta Selatan',
      profile: {
        firstName: developer.nama,
        username: developer.slug
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: `${developer.nama} - Developer Properti Premium`,
      description,
      images: [developer.logo || '/images/developer-placeholder.jpg'],
    },
    alternates: {
      canonical: `https://yourwebsite.com/developer/${params.slug}`,
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
    },
    other: {
      'og:type': 'business.business',
      'business:contact_data:street_address': developer.lokasi,
      'business:contact_data:locality': 'Jakarta Selatan',
      'business:contact_data:region': 'DKI Jakarta',
      'business:contact_data:country_name': 'Indonesia'
    }
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <DeveloperDetail slug={params.slug} />
}
