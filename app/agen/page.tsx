'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

const agenData = [
  {
    id: 1,
    nama: 'Ahmad Fadli',
    foto: '/images/agen/agen1.jpg',
    spesialisasi: 'Residential',
    pengalaman: '5 tahun',
    rating: 4.8,
    lokasi: 'Jakarta Selatan',
    propertiTerjual: 42,
    sertifikasi: ['REI', 'AREBI'],
    telepon: '+62812-3456-7890',
    email: 'ahmad.fadli@email.com'
  },
  {
    id: 2,
    nama: 'Sarah Amalia',
    foto: '/images/agen/agen2.jpg', 
    spesialisasi: 'Commercial',
    pengalaman: '7 tahun',
    rating: 4.9,
    lokasi: 'Jakarta Pusat',
    propertiTerjual: 56,
    sertifikasi: ['REI', 'AREBI'],
    telepon: '+62812-3456-7891',
    email: 'sarah.amalia@email.com'
  },
  {
    id: 3,
    nama: 'Budi Santoso',
    foto: '/images/agen/agen3.jpg',
    spesialisasi: 'Residential & Commercial',
    pengalaman: '10 tahun',
    rating: 5.0,
    lokasi: 'Jakarta Barat',
    propertiTerjual: 89,
    sertifikasi: ['REI', 'AREBI'],
    telepon: '+62812-3456-7892', 
    email: 'budi.santoso@email.com'
  }
]

export const metadata: Metadata = {
  title: 'Agen Properti Premium Jakarta Selatan | Tim Profesional',
  description: 'Tim agen properti profesional spesialis Jakarta Selatan. Berpengalaman dalam jual beli dan sewa properti premium di area strategis Jaksel.',
  keywords: [
    'agen properti jakarta selatan',
    'marketing properti premium',
    'konsultan properti jaksel',
    'tim properti profesional',
    'agen rumah kemang',
    'marketing apartemen pondok indah'
  ]
}

function AgenPage() {
  const [selectedFilter, setSelectedFilter] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgen = agenData.filter(agen => {
    const matchesSearch = agen.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agen.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'semua') return matchesSearch
    if (selectedFilter === 'rating') return matchesSearch && agen.rating >= 4.8
    if (selectedFilter === 'pengalaman') return matchesSearch && parseInt(agen.pengalaman) >= 7
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Agen Properti Profesional</h1>
          <p className="text-gray-600">Temukan agen properti berpengalaman untuk membantu transaksi properti Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Cari agen..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedFilter('semua')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'semua' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setSelectedFilter('rating')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'rating' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Rating Tinggi
            </button>
            <button 
              onClick={() => setSelectedFilter('pengalaman')}
              className={`px-4 py-2 rounded-lg ${selectedFilter === 'pengalaman' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Paling Berpengalaman
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgen.map((agen) => (
            <div key={agen.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-24 h-24">
                    <Image
                      src={agen.foto}
                      alt={agen.nama}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-yellow-500">{agen.rating}</span>
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{agen.nama}</h3>
                <p className="text-gray-600 text-sm mb-4">{agen.spesialisasi}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">Pengalaman</span>
                    <p className="text-lg font-bold text-gray-900">{agen.pengalaman}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">Properti Terjual</span>
                    <p className="text-lg font-bold text-gray-900">{agen.propertiTerjual}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {agen.sertifikasi.map((sertifikat, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                      {sertifikat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">{agen.lokasi}</span>
                  </div>
                  <button className="text-indigo-600 font-semibold hover:text-indigo-700">
                    Hubungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-12 md:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ingin Menjadi Agen Partner?</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan kami untuk memperluas jaringan dan meningkatkan penjualan properti Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Daftar Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgenPage
