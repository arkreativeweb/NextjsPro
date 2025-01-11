'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/agents');
        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        const result = await response.json();
        setAgents(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mitra terpercaya Anda dalam menemukan hunian impian. Kami berkomitmen memberikan layanan properti terbaik dengan integritas dan profesionalisme.
          </p>
        </div>

        {/* Visi Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi perusahaan properti terdepan yang menghadirkan solusi hunian berkualitas dan terjangkau bagi masyarakat Indonesia, dengan standar layanan internasional dan inovasi berkelanjutan.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Memberikan pelayanan profesional dan solusi properti terbaik</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mengembangkan inovasi teknologi dalam industri properti</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-indigo-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Membangun hubungan jangka panjang dengan klien dan mitra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Keunggulan */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Mengapa Memilih Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Terpercaya',
                description: 'Pengalaman lebih dari 10 tahun dalam industri properti dengan ribuan klien puas'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Cepat & Efisien',
                description: 'Proses transaksi yang cepat dan transparan dengan dukungan teknologi modern'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Tim Profesional',
                description: 'Didukung oleh tim berpengalaman yang siap membantu setiap kebutuhan properti Anda'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tim Kami */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {isLoading ? (
              <p className="text-center text-gray-600 col-span-full">Memuat data...</p>
            ) : error ? (
              <p className="text-center text-red-600 col-span-full">
                Terjadi kesalahan: {error}
              </p>
            ) : agents.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">
                Tidak ada data agen untuk ditampilkan.
              </p>
            ) : (
              agents.map((agent) => (
                <div key={agent.id} className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                   <Image
    src={`http://localhost:8000/storage/${agent.image}`}
    alt={agent.name}
    fill
    className="rounded-full object-cover"
  />
</div>
</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-gray-600">{agent.jabatan}</p>
                </div>
              ))
            )}
          </div>
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
  );
};

export default Agents;