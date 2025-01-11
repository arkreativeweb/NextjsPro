'use client'
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: number;
  nama: string;
  slug: string;
  alamat: string;
  harga: string;
  harga_format: string;
  status: string;
  tipe: string;
  images: {
    id: number;
    property_id: number;
    image_path: string;
    caption?: string;
    is_primary: number;
    url?: string;
    created_at?: string;
    updated_at?: string;
  }[];
  user: {
    name: string;
    email: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) {
        console.log('No keyword provided');
        return;
      }

      console.log('Fetching results for keyword:', keyword);
      setIsLoading(true);
      
      try {
        const response = await fetch(
          `https://admin.arearumah.com/api/properties/search?keyword=${encodeURIComponent(keyword)}`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Gagal melakukan pencarian');
        }

        const result = await response.json();
        console.log('Search Results:', result);
        
        if (result.status && result.data) {
          const processedProperties = result.data.data.map((property: Property) => ({
            ...property,
            images: property.images.map(image => ({
              ...image,
              url: `https://admin.arearumah.com/${image.image_path.replace(/^\//, '')}`
            }))
          }));
          
          setProperties(processedProperties);
          console.log('Processed properties:', processedProperties);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  useEffect(() => {
    console.log('Search page mounted');
    console.log('Current keyword:', keyword);
  }, []);

  const handlePropertyClick = (slug: string) => {
    console.log('Navigating to property:', slug);
    window.location.href = `/properti/${slug}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Hasil Pencarian: {keyword}
          </h1>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link 
                  key={property.id}
                  href={`/properti/${property.slug}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img 
                        src={
                          property.images && property.images.length > 0 
                            ? (
                                property.images.find(img => img.is_primary)?.url || 
                                property.images[0].url || 
                                '/images/placeholder.jpg'
                              )
                            : '/images/placeholder.jpg'
                        }
                        alt={property.nama}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          property.status === 'Dijual' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 hover:text-indigo-600 transition-colors">
                        {property.nama}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{property.alamat}</p>
                      <p className="text-indigo-600 font-semibold">{property.harga_format}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Tidak ada properti yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 