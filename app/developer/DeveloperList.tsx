'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TipeUnit {
  id: number;
  nama: string;
  harga: string;
  // ... properti lainnya
}

interface Developer {
  id: number;
  nama: string;
  slug: string;
  logo: string;
  deskripsi: string;
  rating: string;
  proyek: number;
  tahun_berdiri: number;
  lokasi: string;
  tipe_unit: TipeUnit[];
  whatsapp: string;
}

export default function DeveloperPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('https://admin.arearumah.com/api/developers');
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const result = await response.json();
        
        if (result.status && result.data) {
          setDevelopers(result.data);
        } else {
          throw new Error('Data tidak ditemukan');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan dalam mengambil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const getImageUrl = (path?: string): string => {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/storage')) {
      return `https://admin.arearumah.com${path}`;
    }
    return `/images/${path}`;
  };

  const parseHarga = (harga: string): number => {
    const cleanHarga = harga.replace(/[^0-9,]/g, '');
    const number = parseFloat(cleanHarga.replace(',', '.'));
    
    if (harga.toUpperCase().includes('M')) {
      return number * 1000000000;
    }
    if (harga.toUpperCase().includes('JT')) {
      return number * 1000000;
    }
    return number;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-black">
        {/* Background Image */}
        <Image
          src="/images/luxury-hero.jpg" // Pastikan ada gambar luxury di public/images
          alt="Luxury Properties"
          fill
          className="object-cover opacity-40"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Developer Properti <br />
            <span className="text-primary">Premium</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Koleksi eksklusif developer properti terkemuka dengan portofolio proyek mewah dan prestise
          </p>
          <div className="flex gap-6">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">{developers.length}+</div>
              <div className="text-sm text-white/80">Developer Elite</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">
                {developers.reduce((acc, dev) => acc + dev.proyek, 0)}+
              </div>
              <div className="text-sm text-white/80">Proyek Prestisius</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((developer) => (
            <div key={developer.id} className="group">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                {/* Developer Logo & Rating */}
                <div className="relative p-8 flex justify-between items-start">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={getImageUrl(developer.logo)}
                      alt={developer.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-4 py-2 bg-gray-50 rounded-full">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900">{developer.rating}</span>
                  </div>
                </div>

                {/* Developer Info */}
                <Link href={`/developer/${developer.slug}`}>
                  <div className="px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{developer.nama}</h2>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Total Proyek</div>
                        <div className="text-xl font-bold text-primary">{developer.proyek}</div>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Berdiri Sejak</div>
                        <div className="text-xl font-bold text-gray-900">{developer.tahun_berdiri}</div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Location & Price/WhatsApp - Outside Link component */}
                <div className="px-8 pb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {developer.lokasi}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Mulai dari</div>
                      {developer.tipe_unit && developer.tipe_unit.length > 0 ? (
                        <div className="text-lg font-bold text-primary">
                          {developer.tipe_unit
                            .map(unit => unit.harga)
                            .sort((a, b) => parseHarga(a) - parseHarga(b))[0]
                          }
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `https://wa.me/${developer.whatsapp}?text=Halo, saya tertarik dengan properti dari ${developer.nama}`,
                              '_blank'
                            );
                          }}
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          Hubungi Kami
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}