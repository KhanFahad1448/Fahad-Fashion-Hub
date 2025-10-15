import { Star } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Shopcontext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(Shopcontext);

  // State for main image switching
  const [mainImage, setMainImage] = useState(product.image);

  // State for rating selection
  const [selectedRating, setSelectedRating] = useState(product.rating || 0);

  // State for size selection
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-20 md:gap-10 px-6 md:px-0">
      
      {/* Images Section */}
      <div className="flex md:w-1/2 gap-4 flex-wrap md:flex-nowrap">
        <div className="flex flex-col gap-4 md:h-[500px]">
          {[product.image, product.image1, product.image2, product.image3]
            .filter(Boolean)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i + 1}`}
                className={`md:h-[163px] w-[100px] object-cover cursor-pointer rounded-md border ${
                  mainImage === img ? 'border-red-500' : 'border-transparent'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
        </div>
        <div className="flex-1">
          <img
            src={mainImage}
            alt={product.name}
            className="md:h-[580px] w-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex md:w-1/2 flex-col mt-8 md:mt-0">
        
        

        {/* Ratings */}
        <div className="flex items-center gap-1 text-[#1c1c1c] text-lg mt-4 flex-wrap">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                onClick={() => setSelectedRating(i + 1)}
                className="cursor-pointer"
                fill={i < selectedRating ? 'red' : 'gray'}
              />
            ))}
          <p className="ml-2">({product.reviewsCount || 61})</p>
        </div>

        {/* Price */}
        <div className="flex gap-5 font-semibold items-center my-5 flex-wrap">
          <div className="text-gray-500 text-2xl line-through">
            ₹{product.old_price}
          </div>
          <div className="text-red-500 text-3xl">₹{product.new_price}</div>
        </div>

        <p>{product.description}</p>

        {/* Size Selection */}
        <div className="mt-4">
          <h1 className="font-semibold text-gray-400 text-2xl">Select Size</h1>
          <div className="flex gap-4 items-center my-4 flex-wrap">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition ${
                  selectedSize === size ? 'border-red-500 bg-gray-200' : ''
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product.id)}
          className="bg-red-500 text-white px-6 py-3 my-4 w-max hover:bg-red-600 transition"
        >
          ADD TO CART
        </button>

        {/* Category & Tags */}
        <p>
          <span className="font-semibold">Category:</span>{' '}
          {product.category || 'Women, T-shirt, Crop top'}
        </p>
        <p>
          <span className="font-semibold">Tags:</span>{' '}
          {product.tags || 'Modern, Latest'}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
