'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Property {
  id: number;
  nama: string;
  slug: string;
  alamat: string;
  harga: string;
  harga_format: string;
  status: string;
  tipe: string;
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
  user: {
    name: string;
    email: string;
  };
}

const PropertyListClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk filter
  const [filters, setFilters] = useState({
    lokasi: searchParams.get('lokasi') || '',
    tipe: searchParams.get('tipe') || '',
    harga_min: searchParams.get('harga_min') || '',
    harga_max: searchParams.get('harga_max') || ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Buat query string dari filter
        const params = new URLSearchParams();
        if (filters.lokasi) params.append('lokasi', filters.lokasi);
        if (filters.tipe) params.append('tipe', filters.tipe);
        if (filters.harga_min) params.append('harga_min', filters.harga_min);
        if (filters.harga_max) params.append('harga_max', filters.harga_max);

        const response = await fetch(`http://localhost:8000/api/properties?${params.toString()}`);
        const data = await response.json();
        
        if (data.data) {
          setProperties(data.data);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pb-16 md:pb-24"> 
{/* Hero Section */}
<div className="relative h-[300px] md:h-[400px] overflow-hidden pb-24"> {/* Tambahkan padding bottom */}
  <div className="absolute inset-0">
    <img 
      src="/images/property-hero.jpg" 
      alt="Property Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
  </div>
  <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center pt-16 md:pt-20">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl mt-8 md:mt-12">
      Temukan Properti Premium di Jakarta Selatan
    </h1>
    <p className="text-lg text-gray-200 max-w-xl mb-8">
      Koleksi lengkap rumah, apartemen, dan ruko di lokasi strategis dengan harga terbaik
    </p>
  </div>
</div>

<div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-16 md:mb-20"> 


          {/* Filter Card */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <select
                  name="lokasi"
                  value={filters.lokasi}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Semua Lokasi</option>
                  <option value="kemang">Kemang</option>
                  <option value="pondok-indah">Pondok Indah</option>
                  <option value="kebayoran-baru">Kebayoran Baru</option>
                  <option value="senopati">Senopati</option>
                  <option value="scbd">SCBD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Properti
                </label>
                <select
                  name="tipe"
                  value={filters.tipe}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Semua Tipe</option>
                  <option value="rumah">Rumah</option>
                  <option value="apartemen">Apartemen</option>
                  <option value="ruko">Ruko</option>
                  <option value="tanah">Tanah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Range Harga
                </label>
                <select
                  name="harga_range"
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-');
                    setFilters(prev => ({
                      ...prev,
                      harga_min: min,
                      harga_max: max || ''
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Semua Harga</option>
                  <option value="0-500000000">Di bawah 500 Juta</option>
                  <option value="500000000-1000000000">500 Juta - 1 M</option>
                  <option value="1000000000-2000000000">1 M - 2 M</option>
                  <option value="2000000000-5000000000">2 M - 5 M</option>
                  <option value="5000000000-">Di atas 5 M</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({
                    lokasi: '',
                    tipe: '',
                    harga_min: '',
                    harga_max: ''
                  })}
                  className="w-full bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Memuat Properti...' : 
                 properties.length > 0 ? `${properties.length} Listing` : 
                 'Tidak Ada Properti'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Urutkan:</span>
                <select className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Terbaru</option>
                  <option>Harga Tertinggi</option>
                  <option>Harga Terendah</option>
                </select>
              </div>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 md:mb-12">                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <Link
                    href={`/properti/${property.slug}`}
                    key={property.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                    <img
  src={property.images[0]?.url || '/placeholder.jpg'} // Simplified path
  alt={property.nama}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  onError={(e) => {
    // Fallback jika gambar utama atau placeholder gagal dimuat
    e.currentTarget.src = 'images/placeholder.jpg';
  }}
/>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-sm rounded-full">
                          {property.status}
                        </span>
                        <span className="px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-full">
                          {property.tipe}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {property.nama}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {property.alamat}
                      </p>
                      <div className="text-xl font-bold text-indigo-600 mb-4">
                        {property.harga_format}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                          {property.spesifikasi.luas_bangunan} m²
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                          </svg>
                          {property.spesifikasi.kamar_tidur} KT
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                          {property.spesifikasi.kamar_mandi} KM
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak ada properti yang ditemukan
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba sesuaikan filter pencarian Anda
                </p>
                <button
                  onClick={() => setFilters({
                    lokasi: '',
                    tipe: '',
                    harga_min: '',
                    harga_max: ''
                  })}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PropertyListClient; 