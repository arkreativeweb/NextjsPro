'use client'
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Property {
  // ... interface tetap sama ...
}

interface Location {
  // ... interface tetap sama ...
}

interface LocationDetailClientProps {
  slug: string;
}

const LocationDetailClient = ({ slug }: LocationDetailClientProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        const response = await fetch(`https://admin.arearumah.com/api/locations/${slug}`);
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

  // ... rest of the component code stays the same ...
};

export default LocationDetailClient; 