'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedProperty {
  id: number;
  nama: string;
  slug: string;
  alamat: string;
  harga_format: string;
  status: string;
  tipe: string;
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
  total_properties?: number;
  properties?: RelatedProperty[];
}

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
    lantai: number;
    garasi: number;
    listrik: string;
    orientasi: string;
    sertifikat: string;
  };
  fasilitas: string[];
  keamanan: string[];
  images: {
    id: number;
    url: string;
    is_primary: number;
  }[];
  user: {
    id: number;
    name: string;
    email: string;
  };
  informasi_tambahan: {
    kondisi: string;
    sumber_air: string;
    akses_jalan: string;
    tipe_jalan: string;
    jarak_pusat_kota: string;
    lingkungan_sekitar: string;
    keamanan: string[];
    catatan_keamanan: string;
  };
  created_at: string;
  updated_at: string;
  location?: Location;
}

export default function PropertyDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState<RelatedProperty[]>([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log('Fetching property with slug:', slug);
        
        const response = await fetch(`http://localhost:8000/api/properties/${slug}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Response bukan JSON:", text);
          throw new Error("Response bukan format JSON");
        }

        const data = await response.json();
        setProperty(data.data);
        if (data.data.images && data.data.images.length > 0 && data.data.images[0].url) {
          setSelectedImage(data.data.images[0].url);
        } else {
          setSelectedImage('/images/placeholder.jpg');
        }

        if (data.data.location?.id) {
          const relatedResponse = await fetch(`http://localhost:8000/api/locations/${data.data.location.slug}`);
          const relatedData = await relatedResponse.json();
          const filteredProperties = relatedData.data.properties?.filter(
            (p: RelatedProperty) => p.id !== data.data.id
          ) || [];
          setRelatedProperties(filteredProperties.slice(0, 3));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (isLoading || !property) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="h-8 bg-gray-200 w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 w-1/4 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb dengan shadow subtle */}
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-indigo-600 transition-colors">Beranda</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/properti" className="hover:text-indigo-600 transition-colors">Properti</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-400 truncate">{property.nama}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-8">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4 shadow-lg hover:shadow-xl transition-all">
                <img
                  src={selectedImage || '/images/placeholder.jpg'}
                  alt={property.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {property.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url || '/images/placeholder.jpg')}
                    className={`relative h-24 rounded-xl overflow-hidden shadow hover:shadow-md transition-all ${
                      selectedImage === image.url ? 'ring-2 ring-indigo-600 scale-95' : 'hover:scale-95'
                    }`}
                  >
                    <img
                      src={image.url || '/images/placeholder.jpg'}
                      alt={`${property.nama} - gambar ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Deskripsi</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.deskripsi}</p>
              </div>

              {/* Informasi Tambahan - Ditambahkan */}
              {property.informasi_tambahan && (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Tambahan</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {property.informasi_tambahan.kondisi && (
                      <div>
                        <p className="text-gray-600">Kondisi</p>
                        <p className="font-semibold">{property.informasi_tambahan.kondisi}</p>
                      </div>
                    )}
                    {property.informasi_tambahan.sumber_air && (
                      <div>
                        <p className="text-gray-600">Sumber Air</p>
                        <p className="font-semibold">{property.informasi_tambahan.sumber_air}</p>
                      </div>
                    )}
                    {property.informasi_tambahan.akses_jalan && (
                      <div>
                        <p className="text-gray-600">Akses Jalan</p>
                        <p className="font-semibold">{property.informasi_tambahan.akses_jalan}</p>
                      </div>
                    )}
                    {property.informasi_tambahan.tipe_jalan && (
                      <div>
                        <p className="text-gray-600">Tipe Jalan</p>
                        <p className="font-semibold">{property.informasi_tambahan.tipe_jalan}</p>
                      </div>
                    )}
                    {property.informasi_tambahan.jarak_pusat_kota && (
                      <div>
                        <p className="text-gray-600">Jarak ke Pusat Kota</p>
                        <p className="font-semibold">{property.informasi_tambahan.jarak_pusat_kota} km</p>
                      </div>
                    )}
                  </div>
                  
                  {property.informasi_tambahan.catatan_keamanan && (
                    <div className="mt-6">
                      <p className="text-gray-600 mb-2">Catatan Keamanan</p>
                      <p className="text-gray-800">{property.informasi_tambahan.catatan_keamanan}</p>
                    </div>
                  )}

                  {property.informasi_tambahan.keamanan && property.informasi_tambahan.keamanan.length > 0 && (
                    <div className="mt-6">
                      <p className="text-gray-600 mb-2">Keamanan</p>
                      <ul className="space-y-2">
                        {property.informasi_tambahan.keamanan.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-800">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  
                </div>
              )}

              {/* Specifications */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Spesifikasi</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {property.spesifikasi?.luas_tanah && (
                    <div>
                      <p className="text-gray-600">Luas Tanah</p>
                      <p className="font-semibold">{property.spesifikasi.luas_tanah} m²</p>
                    </div>
                  )}
                  {property.spesifikasi?.luas_bangunan && (
                    <div>
                      <p className="text-gray-600">Luas Bangunan</p>
                      <p className="font-semibold">{property.spesifikasi.luas_bangunan} m²</p>
                    </div>
                  )}
                  {property.spesifikasi?.kamar_tidur && (
                    <div>
                      <p className="text-gray-600">Kamar Tidur</p>
                      <p className="font-semibold">{property.spesifikasi.kamar_tidur}</p>
                    </div>
                  )}
                  {property.spesifikasi?.kamar_mandi && (
                    <div>
                      <p className="text-gray-600">Kamar Mandi</p>
                      <p className="font-semibold">{property.spesifikasi.kamar_mandi}</p>
                    </div>
                  )}
                  {property.spesifikasi?.lantai && (
                    <div>
                      <p className="text-gray-600">Lantai</p>
                      <p className="font-semibold">{property.spesifikasi.lantai}</p>
                    </div>
                  )}
                  {property.spesifikasi?.garasi && (
                    <div>
                      <p className="text-gray-600">Garasi</p>
                      <p className="font-semibold">{property.spesifikasi.garasi}</p>
                    </div>
                  )}
                  {property.spesifikasi?.listrik && (
                    <div>
                      <p className="text-gray-600">Listrik</p>
                      <p className="font-semibold">{property.spesifikasi.listrik} watt</p>
                    </div>
                  )}
                  {property.spesifikasi?.orientasi && (
                    <div>
                      <p className="text-gray-600">Orientasi</p>
                      <p className="font-semibold">{property.spesifikasi.orientasi}</p>
                    </div>
                  )}
                  {property.spesifikasi?.sertifikat && (
                    <div>
                      <p className="text-gray-600">Sertifikat</p>
                      <p className="font-semibold">{property.spesifikasi.sertifikat}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Facilities & Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {property.fasilitas && property.fasilitas.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Fasilitas</h2>
                    <ul className="space-y-2">
                      {property.fasilitas.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {property.keamanan && property.keamanan.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Lingkungan Sekitar</h2>
                    <ul className="space-y-2">
                    {property.informasi_tambahan.lingkungan_sekitar && (
                    <div className="mt-6">
                    
                      <p className="text-gray-800 whitespace-pre-line">{property.informasi_tambahan.lingkungan_sekitar}</p>
                    </div>
                  )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              {(property.created_at || property.updated_at) && (
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex justify-between text-sm text-gray-500">
                    {property.created_at && (
                      <p>Diposting pada: {new Date(property.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    )}
                    {property.updated_at && (
                      <p>Terakhir diupdate: {new Date(property.updated_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sticky Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Property Info Card */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                      {property.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {property.tipe}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{property.nama}</h1>
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {property.alamat}
                    </p>
                    {property.location && (
                      <Link 
                        href={`/lokasi/${property.location.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mt-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                        Lihat properti lain di {property.location.name}
                      </Link>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-indigo-600">{property.harga_format}</div>
                </div>

                <div className="border-t mt-6 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-indigo-600">
                        {property.user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{property.user.name}</p>
                      <p className="text-sm text-gray-600">{property.user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan properti ${property.nama} (${property.harga_format})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Hubungi via WhatsApp
              </a>

              {/* Related Properties */}
              {relatedProperties.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Properti Lainnya di {property?.location?.name}
                  </h3>
                  <div className="space-y-4">
                    {relatedProperties.map((relatedProperty) => (
                      <Link
                        key={relatedProperty.id}
                        href={`/properti/${relatedProperty.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={relatedProperty.images.find(img => img.is_primary)?.url || '/images/placeholder.jpg'}
                              alt={relatedProperty.nama}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600">
                              {relatedProperty.nama}
                            </h4>
                            <p className="text-sm text-gray-500 truncate">{relatedProperty.alamat}</p>
                            <p className="text-sm font-semibold text-indigo-600 mt-1">
                              {relatedProperty.harga_format}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-600">
                                {relatedProperty.status}
                              </span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-50 text-gray-600">
                                {relatedProperty.tipe}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {property?.location && (
                    <Link
                      href={`/lokasi/${property.location.slug}`}
                      className="block text-center text-sm text-indigo-600 hover:text-indigo-700 mt-4 font-medium"
                    >
                      Lihat Semua Properti di {property.location.name} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile WhatsApp Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <a
          href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan properti ${property.nama} (${property.harga_format})`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
