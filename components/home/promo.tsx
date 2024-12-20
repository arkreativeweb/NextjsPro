'use client'
import React, { useState, useEffect } from 'react'
import Slider from 'react-slick';

interface Banner {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  is_active: boolean;
  sort_order: number;
}

const promoSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

function Promo() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/banners');
        const result = await response.json();
        
        const sortedBanners = result.data
          .filter((banner: Banner) => banner.is_active)
          .sort((a: Banner, b: Banner) => a.sort_order - b.sort_order);
        
        setBanners(sortedBanners);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Promo Spesial</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* PROMO BANNER */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Promo Spesial</h2>
        </div>
        
        <div className="relative">
          {/* Custom Arrow Buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <button className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <button className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Promo Slider */}
          <Slider {...promoSettings} className="promo-slider">
            {banners.map((banner) => (
              <div key={banner.id} className="px-2">
                <a 
                  href={banner.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="aspect-[16/9]">
                      <img 
                        src={banner.image_url}
                        alt={banner.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2">{banner.description}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Promo;
 
 


