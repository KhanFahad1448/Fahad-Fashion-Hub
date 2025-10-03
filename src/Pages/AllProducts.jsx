import React, { useContext } from "react";
import { Shopcontext } from "../Context/ShopContext";
import Item from "../components/Item";

const AllProducts = () => {
  const { all_product } = useContext(Shopcontext);

  return (
    <div className="md:mt-32 mt-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center font-serif">
        All Products
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {all_product.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
