import React, { useContext } from 'react'
import { Shopcontext } from '../Context/ShopContext'
import Item from '../components/Item'
import banner from '../assets/MensBanner.png'

const Mens = () => {
  const { all_product } = useContext(Shopcontext)
  const menProducts = all_product.filter((product) => product.category === "men")

  return (
    <div className='md:mt-32 mt-20 max-w-7xl mx-auto px-4'>
      {/* Banner */}
      <div>
        <img src={banner} alt="Mens Banner" className='w-full object-cover rounded-lg md:rounded-2xl' />
      </div>

      <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
        {/* Centered Heading */}
        <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center mb-8'>
          Men's Collection
        </h2>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {menProducts.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center group'
            >
              <Item product={product} />
              <div className="mt-4 w-full flex justify-center items-center gap-2">
                {product.old_price && (
                  <span className="text-gray-400 line-through text-base md:text-lg">
                    ₹{product.old_price.toFixed(2)}
                  </span>
                )}
                <span className="text-red-500 font-semibold text-lg md:text-xl">
                  ₹{product.new_price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mens
