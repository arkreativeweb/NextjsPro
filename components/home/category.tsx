'use client'
import { useEffect, useState } from 'react';

interface Location {
  id: number;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Location[];
}

const Category = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/locations');
        const result: ApiResponse = await response.json();
        setLocations(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (isLoading) {
    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Area Populer</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-48"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Area Populer</h2>
        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          Lihat Semua
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {locations.map((location) => (
          <a 
            key={location.id} 
            href={`/lokasi/${location.slug}`}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"/>
            <img 
              src={`http://localhost:8000${location.image}`}
              onError={(e) => {
                e.currentTarget.src = '/images/default-location.jpg';
              }}
              alt={location.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white font-semibold text-lg">{location.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Category;