'use client'

import React, { useState } from 'react'

export default function TitipProperti() {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    alamatProperti: '',
    tipeProperti: 'rumah',
    luasTanah: '',
    luasBangunan: '',
    hargaHarapan: '',
    deskripsi: '',
    foto: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Titipkan Properti Anda</h1>
          <p className="text-gray-600">Kami akan membantu memasarkan properti Anda kepada calon pembeli yang tepat</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Pemilik */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Data Pemilik</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.telepon}
                  onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Data Properti */}
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-semibold text-gray-900">Data Properti</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Properti</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  rows={3}
                  value={formData.alamatProperti}
                  onChange={(e) => setFormData({...formData, alamatProperti: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Properti</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.tipeProperti}
                  onChange={(e) => setFormData({...formData, tipeProperti: e.target.value})}
                  required
                >
                  <option value="rumah">Rumah</option>
                  <option value="apartemen">Apartemen</option>
                  <option value="ruko">Ruko</option>
                  <option value="tanah">Tanah</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Luas Tanah (m²)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    value={formData.luasTanah}
                    onChange={(e) => setFormData({...formData, luasTanah: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Luas Bangunan (m²)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    value={formData.luasBangunan}
                    onChange={(e) => setFormData({...formData, luasBangunan: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga yang Diharapkan</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                  <input
                    type="number"
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    value={formData.hargaHarapan}
                    onChange={(e) => setFormData({...formData, hargaHarapan: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Properti</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  rows={4}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  placeholder="Deskripsikan kondisi dan keunggulan properti Anda..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto Properti</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  onChange={(e) => setFormData({...formData, foto: e.target.files})}
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Upload minimal 3 foto properti (tampak depan, dalam, dan sekitar)</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Titipkan Properti
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
