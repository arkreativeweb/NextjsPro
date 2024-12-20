import { Metadata } from 'next'
import PropertyDetail from './PropertyDetail'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`http://localhost:8000/api/properties/${params.slug}`);
    const data = await response.json();
    const property = data.data;
    
    const specs = [
      `${property.spesifikasi.luas_bangunan}m²`,
      `${property.spesifikasi.kamar_tidur} KT`,
      `${property.spesifikasi.kamar_mandi} KM`,
      `LT: ${property.spesifikasi.luas_tanah}m²`
    ].join(', ');

    const location = property.location?.name || 'Jakarta Selatan';
    const description = `${property.tipe} ${property.status} di ${property.alamat}, ${location}. ${specs}. ${property.deskripsi?.substring(0, 100)}... Harga: ${property.harga_format}`;

    return {
      title: `${property.nama} - ${property.tipe} ${property.status} di ${location}`,
      description,
      keywords: [
        `${property.tipe.toLowerCase()} ${location.toLowerCase()}`,
        `${property.tipe.toLowerCase()} ${property.status.toLowerCase()}`,
        `properti ${location.toLowerCase()}`,
        `${property.tipe.toLowerCase()} dijual ${location.toLowerCase()}`,
        'properti premium',
        'hunian eksklusif',
        property.alamat.toLowerCase()
      ],
      openGraph: {
        title: `${property.nama} - ${property.tipe} ${property.status}`,
        description,
        images: [
          {
            url: property.images[0]?.url || '/images/property-placeholder.jpg',
            width: 1200,
            height: 630,
            alt: property.nama
          }
        ],
        type: 'website',
        locale: 'id_ID',
        siteName: 'Properti Premium Jakarta Selatan'
      }
    }
  } catch (error) {
    return {
      title: 'Properti Tidak Ditemukan',
      description: 'Maaf, properti yang Anda cari tidak tersedia'
    }
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PropertyDetail slug={params.slug} />
}
