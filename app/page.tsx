'use client'
import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Promo from '@/components/home/promo';
import Category from '@/components/home/category';
import ArticleSection from '@/components/home/article';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Property {
  id: number;
  nama: string;
  slug: string;
  alamat: string;
  harga: string;
  harga_format: string;
  status: string;
  tipe: string;
  images: {
    id: number;
    property_id: number;
    image_path: string;
    caption?: string;
    is_primary: number;
    url?: string;
    created_at?: string;
    updated_at?: string;
  }[];
  user: {
    name: string;
    email: string;
  };
}

interface Banner {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  button: string;
}

// Update interface untuk parameter pencarian
interface SearchParams {
  keyword?: string;
  tipe?: string;
  status?: string;
  harga_min?: number;
  harga_max?: number;
  kamar_tidur?: number;
  kamar_mandi?: number;
  lokasi?: string;
  harga_range?: string;
}

// Update interface untuk slides
interface Slide {
  image: string;
  mobileImage: string;
  title?: string;
  description?: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  is_published: boolean;
  published_at: string | null;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/properties`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setProperties(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/baner-utama`);
        const result = await response.json();
        if (result.status && result.data && result.data.length > 0) {
          setBanner(result.data[0]);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && 
          !searchRef.current.contains(event.target as Node) && 
          !isDropdownOpen) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white focus:outline-none group"
        aria-label="Previous"
      >
        <svg 
          className="w-6 h-6 text-gray-600 group-hover:text-gray-900" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white focus:outline-none group"
        aria-label="Next"
      >
        <svg 
          className="w-6 h-6 text-gray-600 group-hover:text-gray-900" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const slides: Slide[] = [
    {
      image: "/images/slider.png",
      mobileImage: "/images/slider-mobile.png",
      title: "Area Rumah Impian",
      description: "Berbagai pilihan properti untuk investasi dan hunian"
    },
    {
      image: "/images/slider1.png",
      mobileImage: "/images/slider1-mobile.png",
      title: "Temukan Properti Terbaik",
      description: "Properti berkualitas dengan lokasi strategis"
    },
    {
      image: "/images/slider1.png",
      mobileImage: "/images/slider-mobile.jpeg",
      title: "Investasi Cerdas",
      description: "Properti dengan potensi pertumbuhan tinggi"
    }
  ];

  // Fungsi untuk handle pencarian via API
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append('keyword', searchQuery);
      }
      
      if (selectedType) {
        params.append('tipe', selectedType);
      }
      
      if (searchParams.status) {
        params.append('status', searchParams.status);
      }
      
      if (searchParams.harga_range) {
        params.append('harga_range', searchParams.harga_range);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/properties/search?${params.toString()}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      if (result.status && result.data) {
        setFilteredProperties(result.data.data); // Access paginated data
        setTotalPages(result.data.last_page);
        setCurrentPage(result.data.current_page);
      }
    } catch (error) {
      console.error('Error searching properties:', error);
      // Tambahkan notifikasi error jika perlu
    } finally {
      setIsSearching(false);
    }
  };

  const getPropertyIcon = (tipe: string) => {
    switch (tipe.toLowerCase()) {
      case 'rumah':
        return '🏠';
      case 'apartemen':
        return '🏢';
      case 'ruko':
        return '🏡';
      case 'tanah':
        return '🌳';
      default:
        return '🏡';
    }
  };

  // Fungsi debounce untuk mencegah terlalu banyak request
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Modifikasi handleSearchInput untuk logging dan debugging
  const handleSearchInput = debounce(async (value: string) => {
    if (value.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/properties/search?keyword=${value}`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Gagal melakukan pencarian');
      }

      const result = await response.json();
      
      // Proses hasil pencarian
      const processedResults = result.data.data.map((property: Property) => ({
        ...property,
        images: property.images.map(image => ({
          ...image,
          url: image.image_path.includes('storage') 
            ? `http://localhost:8000/${image.image_path}`
            : image.image_path.startsWith('http') 
              ? image.image_path 
              : `http://localhost:8000/storage/${image.image_path}`
        }))
      }));

      setSearchResults(processedResults);
      setShowResults(true);
      setSuggestions(result.suggestions || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  // Tambahkan fungsi handleSearch untuk form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/pencarian?keyword=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section dengan background full width */}
        <div className="relative w-full">
          {/* Hero Slider - Full width background */}
          <div className="pt-20 md:pt-24">
            <Slider {...sliderSettings} className="w-full">
              {slides.map((slide, index) => (
                <div key={index} className="relative h-[500px] md:h-[600px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Tambahkan overlay gradient yang lebih gelap */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30">
                    {/* Hero Slider Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4 mt-16 md:mt-0">
                        {/* Slide Title & Description */}
                        <div className="space-y-2">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Content Overlay - Pencarian Property */}
          <div className="absolute inset-x-0 bottom-0 md:inset-0 flex flex-col md:justify-center z-20">
  <div className="w-full max-w-7xl mx-auto px-4 pt-24 md:pt-0"> {/* Kurangi pt-32 menjadi pt-24 */}
    {/* Judul Utama - Kurangi margin */}
    <div className="text-center pb-4 mb-4 md:mb-8 mt-[80px] sm:mt-[100px] md:mt-[120px]"> {/* Kurangi margin */}
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg"> {/* Kurangi mb-4 menjadi mb-2 */}
        Area Rumah Impian
      </h1>
      <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow mb-4"> {/* Kurangi mb-8 menjadi mb-4 */}
        Berbagai pilihan properti untuk investasi dan hunian
      </p>
    </div>

              {/* Search Box dengan Design Modern */}
              <div className="max-w-4xl mx-auto mb-12 md:mb-16 relative z-30">
                <div className="bg-white/90 backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
                  <form onSubmit={handleSearchSubmit} className="flex-1">
                    <div className="relative" ref={searchRef}>
                      {/* Search Icon - Hanya tampil di desktop */}
                      <div className="hidden md:flex absolute inset-y-0 left-0 pl-5 items-center pointer-events-none">
                        <svg 
                          className="h-6 w-6 text-indigo-600 animate-pulse" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                          />
                        </svg>
                      </div>

                      {/* Input dengan Glass Effect - Mobile Optimized */}
                      <input
                        type="text"
                        className="block w-full pl-4 md:pl-14 pr-16 md:pr-36 py-3 md:py-5 text-base md:text-lg 
                                   bg-white/50 border-2 border-gray-100 
                                   rounded-xl md:rounded-2xl 
                                   focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-500 
                                   transition-all duration-300 placeholder:text-gray-400
                                   shadow-inner hover:shadow-md"
                        placeholder="Cari properti..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleSearchInput(e.target.value);
                        }}
                        onFocus={() => {
                          if (searchResults.length > 0) setShowResults(true);
                        }}
                      />

                      {/* Search Button - Mobile Optimized */}
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 
                                   px-3 md:px-8 py-2 md:py-3
                                   bg-gradient-to-r from-indigo-600 to-purple-600 
                                   text-white font-medium 
                                   rounded-lg md:rounded-xl
                                   hover:from-indigo-700 hover:to-purple-700
                                   transform hover:scale-[1.02] active:scale-[0.98]
                                   transition-all duration-200 
                                   shadow-lg hover:shadow-xl
                                   flex items-center gap-1 md:gap-2"
                      >
                        <span className="text-sm md:text-base">Cari</span>
                        <svg 
                          className="w-4 h-4 md:w-5 md:h-5 hidden md:block" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                          />
                        </svg>
                      </button>
                    </div>
                  </form>

                  {/* Dropdown Results dengan Glass Morphism */}
                  {showResults && (
                    <div 
                      className="absolute z-50 w-full mt-4 bg-white/95 backdrop-blur-xl 
                                 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                                 border border-white/20 max-h-[80vh] overflow-y-auto
                                 animate-fadeIn transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      {isSearching ? (
                        <div className="p-4 text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          {/* Quick Stats */}
                          <div className="px-4 py-3 bg-gray-50 border-b">
                            <p className="text-sm text-gray-600">
                              Ditemukan <span className="font-semibold text-gray-900">{searchResults.length}</span> properti
                            </p>
                          </div>

                          {/* Results List */}
                          <div className="divide-y divide-gray-100">
                            {searchResults.slice(0, 5).map((property) => (
                              <a 
                                key={property.id}
                                href={`/properti/${property.slug}`}
                                className="block hover:bg-gray-50 transition-colors cursor-pointer group relative"
                                onMouseEnter={() => {
                                  setIsDropdownOpen(true);
                                  console.log('Hovering:', property.slug);
                                }}
                              >
                                <div className="p-4 flex gap-4">
                                  {/* Property Image */}
                                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                      src={
                                        property.images && property.images.length > 0 
                                          ? (
                                              property.images.find(img => img.is_primary)?.url || 
                                              property.images[0].url || 
                                              '/images/placeholder.jpg'
                                            )
                                          : '/images/placeholder.jpg'
                                      }
                                      alt={property.nama}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/images/placeholder.jpg';
                                        console.log('Image failed to load:', property.images[0]?.url); // Debug log
                                      }}
                                    />
                                  </div>

                                  {/* Property Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                                        property.status === 'Dijual' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-blue-100 text-blue-800'
                                      }`}>
                                        {property.status}
                                      </span>
                                      <span className="text-xs text-gray-500">{property.tipe}</span>
                                    </div>
                                    
                                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                      {property.nama}
                                    </h4>
                                    
                                    <p className="text-sm text-gray-500 truncate mt-1">
                                      {property.alamat}
                                    </p>
                                    
                                    <div className="mt-2 flex items-center gap-4">
                                      <span className="text-indigo-600 font-semibold">
                                        {property.harga_format}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>

                          {/* Footer Actions */}
                          <div className="p-4 bg-gray-50 border-t">
                            <a 
                              href={`/pencarian?keyword=${encodeURIComponent(searchQuery)}`}
                              className="block w-full py-2 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                              onMouseEnter={() => setIsDropdownOpen(true)}
                            >
                              Lihat Semua {searchResults.length} Properti
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="p-6 text-center">
                          <p className="text-lg font-semibold text-gray-700 mb-4">
                            Tidak ada hasil untuk "{searchQuery}"
                          </p>
                          
                          {/* Saran Pencarian */}
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Coba dengan:</p>
                            {suggestions.map((suggestion, index) => (
                              <a
                                key={index}
                                href={`/pencarian?keyword=${encodeURIComponent(suggestion)}`}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                              >
                                {suggestion}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Categories */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 pb-12">
                {['Rumah', 'Apartemen', 'Ruko', 'Tanah'].map((category) => (
                  <a
                    key={category}
                    href={`/pencarian?tipe=${category}`}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 
                              text-white rounded-full backdrop-blur-sm 
                              transition-all duration-300 flex items-center gap-2 
                              group hover:scale-105 hover:shadow-lg"
                  >
                    <span className="transform group-hover:scale-110 transition-transform">
                      {getPropertyIcon(category)}
                    </span>
                    <span className="font-medium">{category}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Centered with max-width */}
        <div className="w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-12">
           
           <Category/>

          <Promo/>

            {/* Properti Unggulan */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Properti Unggulan</h2>
                <Link href="/properti" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Lihat Semua
                </Link>
              </div>
              
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                // Property cards
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(filteredProperties.length > 0 ? filteredProperties : properties).map((property) => (
                    <Link 
                      href={`/properti/${property.slug}`} 
                      key={property.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img 
                          src={property.images[0]?.url || '/images/placeholder.jpg'} 
                          alt={property.nama}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-indigo-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                            {property.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                          {property.nama}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {property.alamat}
                        </p>
                        <div className="text-indigo-600 font-semibold mb-4">
                          {property.harga_format}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          {property.spesifikasi && (
                            <>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                {property.spesifikasi.luas_bangunan} m²
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                {property.spesifikasi.kamar_tidur} KT
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                {property.spesifikasi.kamar_mandi} KM
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Full Width Advertisement Banner */}
            <div className="relative w-full mb-8 md:mb-16 overflow-hidden">
              <div className="max-w-[1920px] mx-auto px-4 md:px-0">
                <div className="aspect-[16/12] md:aspect-[21/6] relative rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600">
                  {banner && (
                    <>
                      {/* Background Image dengan object position yang berbeda untuk mobile */}
                      <img 
                        src={`http://localhost:8000${banner.gambar}`}
                        alt={banner.judul}
                        className="w-full h-full object-cover md:object-center object-right-top rounded-xl md:rounded-2xl"
                      />

                      {/* Overlay gradient yang lebih kuat di mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r 
                                     from-black/80 via-black/60 to-black/80 
                                     md:from-black/60 md:via-transparent md:to-black/60 
                                     rounded-xl md:rounded-2xl">
                        
                        {/* Content Container dengan padding yang disesuaikan */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center px-4 md:px-8 w-full max-w-2xl">
                            {/* Judul dengan ukuran yang responsif */}
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 capitalize
                                          leading-tight drop-shadow-lg">
                              {banner.judul}
                            </h2>

                            {/* Deskripsi dengan ukuran yang responsif */}
                            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 
                                         max-w-xl mx-auto leading-relaxed drop-shadow
                                         line-clamp-3 md:line-clamp-none">
                              {banner.deskripsi}
                            </p>

                            {/* Tombol CTA dengan ukuran yang disesuaikan */}
                            <a 
                              href={banner.button}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600
                                       text-white px-6 md:px-8 py-2.5 md:py-3 
                                       rounded-lg font-semibold 
                                       hover:from-indigo-700 hover:to-purple-700 
                                       transition-all duration-300
                                       shadow-lg hover:shadow-xl
                                       transform hover:scale-105
                                       text-sm md:text-base"
                            >
                              Lihat Properti Pilihan
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Elements - Hanya tampil di desktop */}
                      <div className="hidden md:block absolute -right-10 -top-10 w-40 h-40 
                                     bg-purple-500/20 rounded-full blur-2xl"></div>
                      <div className="hidden md:block absolute -left-10 -bottom-10 w-40 h-40 
                                     bg-indigo-500/20 rounded-full blur-2xl"></div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <ArticleSection />
          </div>
        </div>

       {/* About Us Section - Full Width */}
<div className="py-20 border-t">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Properti Impian di Jakarta Selatan, Bintaro, Menanti Anda
        </h2>
        <div className="space-y-4 text-gray-600 mb-8">
          <p>
            Kami adalah platform properti terdepan yang siap membantu Anda menemukan properti ideal di kawasan Jakarta Selatan, termasuk Bintaro. Dengan pengalaman lebih dari 10 tahun, kami memahami kebutuhan Anda dalam menemukan hunian strategis dan nyaman.
          </p>
          <p>
            Tim profesional kami siap membantu Anda dengan:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Konsultasi properti di Jakarta Selatan
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Panduan investasi properti kawasan Bintaro
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Bantuan proses legal dan KPR untuk properti di Jakarta Selatan
            </li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Hubungi Kami
          </button>
          <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
          <div className="text-gray-600">Properti Terdaftar di Jakarta Selatan</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-indigo-600 mb-2">15K+</div>
          <div className="text-gray-600">Klien Puas Menemukan Hunian di Bintaro</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
          <div className="text-gray-600">Agen Profesional Siap Melayani Anda</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
          <div className="text-gray-600">Kota Tercakup</div>
        </div>
      </div>
    </div>

    {/* Partners */}
    <div className="mt-16 pt-16 border-t">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Dipercaya Oleh</h3>
        <p className="text-gray-600">Bermitra dengan developer dan bank terkemuka di Indonesia</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
        <img 
          src="/images/bni.png" 
          alt="Partner BNI" 
          className="h-8 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
        />
        <img 
          src="/images/bri.png" 
          alt="Partner BRI" 
          className="h-8 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
        />
        <img 
          src="/images/bca.png" 
          alt="Partner BCA" 
          className="h-8 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
        />
        <img 
          src="/images/mandiri.png" 
          alt="Partner Mandiri" 
          className="h-8 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
        />
        <img 
          src="/images/bni.png" 
          alt="Partner BNI" 
          className="h-8 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
        />
      </div>
    </div>
  </div>
</div>


       {/* SEO Article Section */}
<div className="bg-gray-50 py-16 border-t">
  <div className="max-w-7xl mx-auto px-4">
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Temukan Properti Impian Anda di Jakarta Selatan, Termasuk Kawasan Bintaro
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 text-sm leading-relaxed">
        <div className="space-y-4">
          <p>
            Selamat datang di platform properti terpercaya di Jakarta Selatan. Kami menyediakan berbagai pilihan properti mulai dari rumah, apartemen, ruko, hingga tanah yang tersebar di berbagai lokasi strategis seperti Bintaro, Pondok Indah, dan Cipete. Dengan pengalaman lebih dari 10 tahun di industri properti, kami berkomitmen membantu Anda menemukan hunian yang sesuai dengan kebutuhan dan budget.
          </p>
          <p>
            Kawasan <strong>Bintaro</strong> semakin diminati sebagai lokasi hunian modern dengan akses mudah ke pusat Jakarta. Dengan fasilitas lengkap seperti pusat perbelanjaan, sekolah internasional, dan akses tol yang strategis, <strong>Bintaro</strong> menjadi pilihan tepat bagi keluarga maupun investor properti.
          </p>
        </div>
        
        <div className="space-y-4">
          <p>
            Bagi Anda yang mencari rumah di <strong>Jakarta Selatan</strong>, kami menawarkan berbagai properti dengan desain modern di kawasan seperti <strong>Bintaro</strong>, Cilandak, dan Kebayoran Lama. Dengan dukungan jaringan developer terpercaya dan sistem KPR yang mudah, impian memiliki hunian sendiri dapat segera terwujud.
          </p>
          <p>
            Tim profesional kami siap membantu Anda dalam setiap langkah, mulai dari pencarian properti, survei lokasi, negosiasi harga, hingga proses legal. Dengan database properti lengkap dan update real-time, menemukan rumah impian di <strong>Jakarta Selatan</strong> kini lebih cepat dan efisien.
          </p>
        </div>
      </div>

      {/* Keywords */}
      <div className="mt-8 flex flex-wrap gap-2 text-sm text-gray-500">
        <span>Tags:</span>
        <a href="#" className="hover:text-indigo-600">jual rumah Jakarta Selatan</a> •
        <a href="#" className="hover:text-indigo-600">rumah dijual Bintaro</a> •
        <a href="#" className="hover:text-indigo-600">investasi properti Jakarta Selatan</a> •
        <a href="#" className="hover:text-indigo-600">apartemen Bintaro</a> •
        <a href="#" className="hover:text-indigo-600">properti premium Jakarta Selatan</a> •
        <a href="#" className="hover:text-indigo-600">ruko strategis Bintaro</a> •
        <a href="#" className="hover:text-indigo-600">KPR rumah Jakarta Selatan</a> •
        <a href="#" className="hover:text-indigo-600">rumah minimalis Bintaro</a> •
        <a href="#" className="hover:text-indigo-600">properti baru Jakarta Selatan</a> •
        <a href="#" className="hover:text-indigo-600">rumah mewah Bintaro</a>
      </div>
    </div>
  </div>
</div>

      </div>
      
      
    </>
  );
};

export default HomePage;
