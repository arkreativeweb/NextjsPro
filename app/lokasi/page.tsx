'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Location {
  id: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
  total_properties?: number;
  created_at: string;
  updated_at: string;
}

const LocationPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/locations?limit=4');
        const result = await response.json();
        setLocations(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Filter berdasarkan data yang sering dicari
  const filters = [
    
  ];

  const filteredLocations = locations.filter(location => {
    if (selectedFilter === 'all') return true;
    return location.slug.includes(selectedFilter);
  });

  // Fungsi untuk memformat angka
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num/1000).toFixed(1)}K+`;
    }
    return `${num}+`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section dengan Background Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/images/lokasi.png" 
              alt="City Skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Area Properti Terpopuler
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Temukan hunian impian Anda di lokasi premium dengan akses terbaik
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                    ${selectedFilter === filter.id 
                      ? 'bg-white text-indigo-600 shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location Grid Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lokasi Strategis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Area premium dengan akses mudah ke berbagai fasilitas dan infrastruktur kota
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-200" />
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredLocations.map((location) => (
                <Link 
                  href={`/lokasi/${location.slug}`}
                  key={location.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                             transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={`http://localhost:8000${location.image}`}
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/default-location.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                        {location.name}
                      </h2>
                      {location.total_properties && (
                        <div className="flex items-center gap-2 text-gray-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                          <span>{location.total_properties} Properti Tersedia</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {location.description && (
                    <div className="p-6 border-t border-gray-100">
                      <p className="text-gray-600 line-clamp-2">
                        {location.description}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-medium 
                                   text-indigo-600 shadow-lg">
                      Lihat Detail
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/properti"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg 
                         font-semibold hover:bg-indigo-700 transition-colors"
            >
              Lihat Semua Properti
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default LocationPage; 