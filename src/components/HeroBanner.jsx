import React from 'react'
import banner from '../assets/HeroBanner.jpg'
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className='bg-gray-100 lg:pt-24 pt-16'>
      <div
        className='relative max-w-7xl mx-auto md:rounded-2xl pt-20 sm:pt-24 bg-cover bg-center h-[400px] sm:h-[500px] md:h-[600px]'
        style={{ backgroundImage: `url(${banner})`, backgroundPosition: 'top' }}
      >
        <div className='absolute inset-0 bg-black md:rounded-2xl bg-opacity-50 flex items-center justify-center'>
          <div className='text-center text-white px-3 sm:px-6'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight'>
              Discover Your Style
            </h1>
            <p className='text-sm sm:text-base md:text-xl mb-5 sm:mb-6 text-white'>
              Shop the latest trends and find your perfect look
            </p>
            <Link to="/products">
              <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base'>
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
