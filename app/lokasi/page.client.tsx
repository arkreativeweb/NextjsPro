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

const LocationPageClient = () => {
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

  const filteredLocations = locations.filter(location => {
    if (selectedFilter === 'all') return true;
    return location.slug.includes(selectedFilter);
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
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
          </div>
        </div>

        {/* Location Grid Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* ... rest of the component code ... */}
        </div>
      </div>
    </>
  );
};

export default LocationPageClient; 