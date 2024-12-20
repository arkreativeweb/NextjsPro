'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Galeri {
  id: number;
  judul: string;
  gambar: string;
  deskripsi: string;
}

interface TipeUnit {
  id: number;
  nama: string;
  gambar: string;
  harga: string;
  luas_tanah: string;
  luas_bangunan: string;
  kamar_tidur: number;
  kamar_mandi: number;
  fitur: string[];
}

interface ProyekBerjalan {
  id: number;
  nama: string;
  gambar: string;
  lokasi: string;
  tipe: string;
  status: string;
  harga: string;
  spesifikasi: string[];
  fasilitas: string[];
}

interface Developer {
  id: number;
  nama: string;
  slug: string;
  logo: string;
  deskripsi: string;
  deskripsi_panjang: string;
  proyek: number;
  tahun_berdiri: number;
  rating: string;
  lokasi: string;
  alamat: string;
  telepon: string;
  email: string;
  whatsapp: string;
  fasilitas: string[];
  lokasi_terdekat: string[];
  galeri: Galeri[];
  tipe_unit: TipeUnit[];
  proyek_berjalan: ProyekBerjalan[];
}

export default function DeveloperDetail() {
  const params = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [activeTab, setActiveTab] = useState('detail');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (path?: string): string => {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `http://localhost:8000${path}`;
  };

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/developers/${params.slug}`);
        if (!response.ok) throw new Error('Failed to fetch developer');
        const result = await response.json();
        if (result.status && result.data) {
          setDeveloper(result.data);
        }
      } catch (error) {
        setError('Failed to load developer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeveloper();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 md:pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
      </div>
    );
  }

  if (error || !developer) {
    return (
      <div className="min-h-screen pt-28 md:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{4})(\d{4})(\d{4})/, 'xxxx-xxxx-$3');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 md:pt-24 pb-20">
      {/* Hero Section - Mengubah tinggi dan padding untuk mobile */}
      <div className="relative h-[80vh] md:h-[60vh] bg-black">
        {/* Background Image */}
        {developer.galeri[0] && (
          <Image
            src={getImageUrl(developer.galeri[0].gambar)}
            alt={developer.nama}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        {/* Hero Content - Menyesuaikan padding untuk mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
              {/* Logo */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden">
                <Image
                  src={getImageUrl(developer.logo)}
                  alt={developer.nama}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-cover"
                />
              </div>
              {/* Info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{developer.nama}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/80 mb-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {developer.rating}
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div>{developer.proyek} Proyek</div>
                  <span className="hidden md:inline">•</span>
                  <div>Sejak {developer.tahun_berdiri}</div>
                </div>
                <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
                  {developer.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Deskripsi */}
            <div className="bg-white rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Detail Properti</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{developer.deskripsi_panjang}</p>
            </div>

            {/* Proyek Berjalan - Dipindah ke sini dan diperbarui */}
            {developer.proyek_berjalan.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="relative">
                  {/* Header dengan Background Image */}
                  <div className="relative h-48">
                    <Image
                      src={getImageUrl(developer.proyek_berjalan[0].gambar)}
                      alt="Project Cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h2 className="text-3xl font-bold text-white mb-2">Proyek Unggulan</h2>
                      <p className="text-white/90">Progress pembangunan terkini dari {developer.nama}</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {developer.proyek_berjalan.map((proyek, index) => (
                    <div key={proyek.id} className={`${index > 0 ? 'border-t border-gray-100 pt-8 mt-8' : ''}`}>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Project Image */}
                        <div className="relative h-72 rounded-xl overflow-hidden group">
                          <Image
                            src={getImageUrl(proyek.gambar)}
                            alt={proyek.nama}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
                              {proyek.status}
                            </span>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-2xl font-bold text-gray-900">{proyek.nama}</h3>
                              <span className="text-xl font-bold text-primary">{proyek.harga}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-6">
                              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {proyek.lokasi}
                            </div>

                            {/* Specifications & Facilities */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Spesifikasi</h4>
                                <ul className="space-y-2">
                                  {proyek.spesifikasi.map((spec, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                      <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      {spec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Fasilitas</h4>
                                <ul className="space-y-2">
                                  {proyek.fasilitas.map((fasilitas, index) => (
                                    <li key={index} className="flex items-center text-gray-600">
                                      <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      {fasilitas}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Action Button - WhatsApp */}
                          <a
                            href={`https://wa.me/${developer.whatsapp}?text=Halo, saya tertarik dengan proyek ${proyek.nama} dari ${developer.nama}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                          >
                            <svg className="w-5 h-5 transition-transform group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            Hubungi via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
              {/* Contact & Info Cards */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Alamat</div>
                    <div>{developer.alamat}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div>{developer.email}</div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Fasilitas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {developer.fasilitas.map((fasilitas, index) => (
                    <div 
                      key={index} 
                      className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {fasilitas}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Locations */}
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Lokasi Terdekat</h3>
                <div className="grid grid-cols-2 gap-4">
                  {developer.lokasi_terdekat.map((lokasi, index) => (
                    <div 
                      key={index} 
                      className="flex items-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {lokasi}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tipe Unit Section dengan Header yang Menarik */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pilihan Tipe Unit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan unit yang sesuai dengan kebutuhan Anda dari berbagai pilihan yang tersedia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developer.tipe_unit.map((unit) => (
              <div key={unit.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={getImageUrl(unit.gambar)}
                    alt={unit.nama}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{unit.nama}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Harga</div>
                      <div className="font-bold text-primary">{unit.harga}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Luas Tanah</div>
                      <div className="font-bold">{unit.luas_tanah}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Luas Bangunan</div>
                      <div className="font-bold">{unit.luas_bangunan} m²</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Kamar Tidur</div>
                      <div className="font-bold">{unit.kamar_tidur}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fitur</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {unit.fitur.map((fitur, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {fitur}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fasilitas & Galeri Section */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fasilitas & Galeri</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nikmati berbagai fasilitas premium yang kami sediakan untuk kenyamanan Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developer.galeri.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={getImageUrl(item.gambar)}
                    alt={item.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-bold text-lg mb-2">{item.judul}</h3>
                    <p className="text-sm text-white/90">{item.deskripsi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lokasi Terdekat Section */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Lokasi Strategis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Akses mudah ke berbagai fasilitas publik di sekitar lokasi
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {developer.lokasi_terdekat.map((lokasi, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">{lokasi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="relative bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {/* Price Info */}
              <div className="flex-1 hidden md:block">
                <p className="text-sm text-gray-500">Harga Mulai Dari</p>
                <p className="text-xl font-bold text-gray-900">
                  {developer.tipe_unit[0]?.harga || 'Hubungi Kami'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex-1 md:flex-none flex gap-3">
                <a
                  href={`tel:${developer.telepon}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors flex-1 md:flex-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden md:inline">Hubungi Kami</span>
                  <span className="md:hidden">Telepon</span>
                </a>
                
                <a
                  href={`https://wa.me/${developer.whatsapp}?text=Halo, saya tertarik dengan properti dari ${developer.nama}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl flex-1 md:flex-none group"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:-rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="hidden md:inline">Chat WhatsApp</span>
                  <span className="md:hidden">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
