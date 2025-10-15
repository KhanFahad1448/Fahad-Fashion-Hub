import React from 'react'
import banner from '../assets/MidBanner.jpg'

const MidBanner = () => {
  return (
    <div className='bg-gray-100 py-16 sm:py-20 md:py-24'>
      <div
        className='relative max-w-7xl mx-auto md:rounded-2xl pt-20 sm:pt-24 bg-cover bg-center h-[380px] sm:h-[500px] md:h-[600px]'
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: 'center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll', // ensures smooth mobile rendering
        }}
      >
        <div className='absolute inset-0 bg-black md:rounded-2xl bg-opacity-50 flex items-center justify-center'>
          <div className='text-center text-white px-3 sm:px-6'>
            <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight'>
              Winter Collection 2025
            </h1>
            <p className='text-sm sm:text-base md:text-xl mb-5 sm:mb-6 text-white max-w-2xl mx-auto'>
              Discover the hottest trends for the season. Limited time offer: 20% off all new arrivals!
            </p>
            <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner
