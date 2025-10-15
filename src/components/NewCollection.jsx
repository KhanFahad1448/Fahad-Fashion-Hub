import React, { useContext } from 'react'
import { Shopcontext } from '../Context/ShopContext'
import Item from './Item'

const NewCollection = () => {
  const { new_collections } = useContext(Shopcontext)

  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-2xl px-4 py-12 sm:pt-20 lg:max-w-7xl lg:px-8'>
        {/* Section Title */}
        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-center mb-4'>
          New Collection
        </h2>

        {/* Description */}
        <p className='text-center mt-3 text-sm sm:text-base text-gray-600 leading-relaxed md:px-32 lg:px-56'>
          Discover the art of stillness with our new collection of minimalist home essentials. Built
          around the philosophy that less is truly more, these pieces combine clean lines, rich
          textures, and muted colorways to transform your space into a peaceful retreat. Every
          item—from the hand-thrown ceramics to the linen throws—is designed to bring a sense of
          tranquility and order to your daily life.
        </p>

        {/* Product Grid */}
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {new_collections.map((product) => (
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

export default NewCollection
