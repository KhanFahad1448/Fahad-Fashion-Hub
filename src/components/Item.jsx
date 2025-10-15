import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="group relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl bg-white overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div
          onClick={() => window.scrollTo(0, 0)}
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-xl bg-gray-100 lg:aspect-none lg:h-80 h-96"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#1560BD] transition-colors duration-300">
            <Link to={`/products/${product.id}`}>
              <span aria-hidden="true" className="inset-0">
                {product?.name}
              </span>
            </Link>
          </h3>
        </div>
        <p className="text-sm md:text-base font-bold text-gray-900">
          ₹{product?.new_price}
        </p>
      </div>
    </div>
  );
};

export default Item;
