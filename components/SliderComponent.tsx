'use client'
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

interface SliderProps {
  settings: any;
  children: React.ReactNode;
}

const SliderComponent = ({ settings, children }: SliderProps) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderComponent; 