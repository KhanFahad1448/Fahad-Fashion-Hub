import React, { useContext } from 'react';
import { Shopcontext } from '../Context/ShopContext';
import Item from './Item';

const TopSellers = () => {
  const { all_product } = useContext(Shopcontext);
  const topProducts = all_product.slice(0, 20); // Top 20 products

  return (
    <div className='md:mt-32 mt-20 max-w-7xl mx-auto px-4'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:pt-24 lg:max-w-7xl lg:px-8'>
        {/* Section Heading */}
        <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center mb-8'>
          Top Sellers
        </h2>
        <p className='text-center text-gray-600 mb-12 px-2 sm:px-24'>
          Checkout our top selling products, loved all around the country. Pick the style which suits you best.
        </p>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {topProducts.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center group'
            >
              {/* Product Item */}
              <Item product={product} />

              {/* Price */}
              <div className='mt-4 w-full flex justify-center items-center gap-2'>
                {product.old_price && (
                  <span className='text-gray-400 line-through text-base md:text-lg'>
                    ₹{product.old_price.toFixed(2)}
                  </span>
                )}
                <span className='text-red-500 font-semibold text-lg md:text-xl'>
                  ₹{product.new_price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellers;
