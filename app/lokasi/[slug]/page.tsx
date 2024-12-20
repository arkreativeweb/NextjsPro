'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
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
  deskripsi: string;
  spesifikasi: {
    luas_tanah: string;
    luas_bangunan: string;
    kamar_tidur: number;
    kamar_mandi: number;
  };
  images: {
    id: number;
    url: string;
    is_primary: number;
  }[];
}

interface Location {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  long_description?: string;
  total_properties?: number;
  properties?: Property[];
  banner_image?: string;
}

const LocationDetail = () => {
  const params = useParams();
  const { slug } = params;
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/locations/${slug}`);
        const result = await response.json();
        setLocation(result.data);
        if (result.data.properties) {
          setTotalProperties(result.data.properties.length);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching location detail:', error);
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchLocationDetail();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="h-8 bg-gray-200 w-1/3 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 w-2/3 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 h-72 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!location) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Lokasi tidak ditemukan</h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        {/* Hero Section with Location Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10"/>
          
          {/* Background Image dengan Parallax Effect */}
          <div className="absolute inset-0">
            {location.image ? (
              <img 
                src={location.image.startsWith('http') 
                  ? location.image 
                  : `http://localhost:8000/storage${location.image}`
                }
                alt={location.name}
                className="w-full h-full object-cover object-center transform scale-110 hover:scale-105 transition-transform duration-3000"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = '/images/placeholder.jpg'; // Fallback image
                  console.log('Error loading image:', location.image);
                }}
              />
            ) : (
              // Fallback jika tidak ada gambar
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-700">
                {/* Optional: tambahkan pattern atau overlay */}
                <div className="absolute inset-0 opacity-20" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-2 bg-indigo-600/80 backdrop-blur-sm text-white text-sm rounded-full mb-4">
                  Area Premium
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {location.name}
                </h1>
                {location.description && (
                  <p className="text-xl text-gray-200 mb-6 drop-shadow-lg">
                    {location.description}
                  </p>
                )}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                    <p className="text-white">
                      <span className="text-2xl font-bold">{totalProperties}</span>
                      <span className="ml-2">Properti Tersedia</span>
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                    <p className="text-white">
                      <span className="text-2xl font-bold">Premium</span>
                      <span className="ml-2">Lokasi</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Properti di {location.name}
              </h2>
            </div>
            
            {location.properties && location.properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {location.properties.map((property) => (
                  <Link 
                    href={`/properti/${property.slug}`}
                    key={property.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Property Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.images.find(img => img.is_primary)?.url || '/images/placeholder.jpg'}
                        alt={property.nama}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === 'Tersedia' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </div>

                    {/* Property Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                        {property.nama}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                        {property.alamat}
                      </p>
                      
                      {/* Spesifikasi Ringkas */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          </svg>
                          {property.spesifikasi.luas_bangunan} m²
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          </svg>
                          {property.spesifikasi.kamar_tidur} KT
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          </svg>
                          {property.spesifikasi.kamar_mandi} KM
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-semibold">
                          {property.harga_format}
                        </span>
                        <span className="text-sm text-gray-500">
                          {property.tipe}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada properti</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Belum ada properti yang tersedia di {location.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Location Description Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Discover</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  Tentang {location.name}
                </h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
              </div>
              
              {location.long_description ? (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {location.long_description}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center text-gray-600 max-w-3xl mx-auto">
                    <p className="text-lg leading-relaxed">
                      Kawasan {location.name} merupakan salah satu area pemukiman premium yang berkembang pesat 
                      di kawasan strategis. Dengan akses yang mudah dan berbagai fasilitas modern di sekitarnya, 
                      {location.name} menjadi pilihan ideal untuk tempat tinggal maupun investasi properti.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-gray-50 p-8 rounded-2xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas Sekitar</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Pusat perbelanjaan modern
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Sekolah dan universitas terkemuka
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Rumah sakit dan klinik kesehatan
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Akses transportasi publik
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-8 rounded-2xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Keunggulan Lokasi</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Lokasi strategis di pusat kota
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Lingkungan aman dan nyaman
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Area bebas banjir
                        </li>
                        <li className="flex items-center gap-3 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Kawasan berkembang pesat
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Facts dengan style yang lebih menarik */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-8 rounded-2xl text-center text-white">
                  <div className="text-4xl font-bold mb-2">
                    {totalProperties}
                  </div>
                  <p className="text-indigo-100">Total Properti</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-8 rounded-2xl text-center text-white">
                  <div className="text-4xl font-bold mb-2">
                    Premium
                  </div>
                  <p className="text-indigo-100">Lokasi</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-8 rounded-2xl text-center text-white">
                  <div className="text-4xl font-bold mb-2">
                    Modern
                  </div>
                  <p className="text-indigo-100">Fasilitas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetail; 