// components/Navbar.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#FFFFFF] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-[#F2F2F2]">
          <div className="flex items-center gap-6 text-[#333333]">
            <a href="tel:+6281234567890" className="flex items-center gap-2 hover:text-[#4338ca]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +62 812-3456-7890
            </a>
            <a href="mailto:info@properti.com" className="flex items-center gap-2 hover:text-[#4338ca]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@properti.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-[#333333]">
              <a href="#" className="hover:text-[#4338ca]">FAQ</a>
              <span>|</span>
              <a href="#" className="hover:text-[#4338ca]">Tentang Kami</a>
              <span>|</span>
              <a href="#" className="hover:text-[#4338ca]">Kontak</a>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <a href="#" className="hover:text-[#4338ca]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-[#4338ca]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-[#4338ca]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#333333] hover:text-[#4338ca]">Beranda</Link>
            <Link href="/lokasi" className="text-[#333333] hover:text-[#4338ca]">Lokasi</Link>
            <Link href="/tentang-kami" className="text-[#333333] hover:text-[#4338ca]">Tentang Kami</Link>
            <Link href="/properti" className="text-[#333333] hover:text-[#4338ca]">Properti</Link>
            <Link href="/developer" className="text-[#333333] hover:text-[#4338ca]">Developer</Link>
            <Link href="/artikel" className="text-[#333333] hover:text-[#4338ca]">Artikel</Link>
           
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-[#333333] hover:text-[#4338ca]">Masuk</Link>
            <Link href="#" className="bg-[#4338ca] text-white px-4 py-2 rounded-lg hover:bg-[#3730a3] transition-colors">
              Pasang Iklan
              
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-[#F2F2F2]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Beranda
            </Link>
            <Link href="/lokasi" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Lokasi
            </Link>
            <Link href="/tentang-kami" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Tentang Kami
            </Link>
            <Link href="/properti" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Properti
            </Link>
            <Link href="/developer" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Developer
            </Link>
            <Link href="/artikel" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
              Artikel
            </Link>
           
            <div className="pt-4 pb-3 border-t border-[#F2F2F2]">
              <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#4338ca] hover:bg-[#F2F2F2]">
                Masuk
              </Link>
              <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-[#4338ca] text-white hover:bg-[#3730a3]">
                Pasang Iklan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;