// src/Pages/Cart.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../Context/ShopContext';
import EmptyCart from '../assets/EmptyCart.png';
import { X } from 'lucide-react';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartItems,
    clearCart
  } = useContext(Shopcontext);

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    if (!auth.currentUser) {
      setMessage('Please login to place an order.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="mt-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto my-10">
        {getTotalCartItems() === 0 ? (
          <div className="flex items-center justify-center">
            <img src={EmptyCart} alt="Empty Cart" />
          </div>
        ) : (
          <div>
            {message && (
              <p className="text-red-500 font-semibold text-center mb-4">{message}</p>
            )}

            {/* Cart Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-2 md:px-4 py-2 font-semibold text-gray-700">
              <p>Products</p>
              <p>Title</p>
              <p className="hidden md:block">Price</p>
              <p className="hidden md:block">Quantity</p>
              <p className="hidden md:block">Total</p>
              <p className="hidden md:block">Remove</p>
            </div>
            <hr className="bg-gray-300 border-0 h-[2px] my-2" />

            {/* Cart Items */}
            {all_product.map(item => {
              if (cartItems[item.id] > 0) {
                return (
                  <div key={item.id}>
                    <div className="text-gray-500 text-sm sm:text-base grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-2 md:px-4 gap-2 py-2">
                      <img src={item.image} className="h-16 w-16 object-cover rounded-lg" alt={item.name} />
                      <p>{item.name}</p>
                      <p className="hidden md:block">₹{item.new_price}</p>
                      <button className="w-12 sm:w-16 h-8 sm:h-10 bg-white border border-gray-300 rounded-md text-sm">{cartItems[item.id]}</button>
                      <p className="hidden md:block">₹{item.new_price * cartItems[item.id]}</p>
                      <X onClick={() => removeFromCart(item.id)} className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                    </div>
                    <hr className="bg-gray-300 border-0 h-[1.5px] my-2" />
                  </div>
                );
              }
              return null;
            })}

            {/* Cart Totals & Checkout */}
            <div className="flex flex-col lg:flex-row my-12 gap-6 lg:gap-32">
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-lg font-bold">Cart Totals</h1>
                <div>
                  <div className="flex justify-between py-2">
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                  </div>
                  <hr className="bg-gray-300 border-0 h-[1px] mt-2" />
                  <div className="flex justify-between py-2">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr className="bg-gray-300 border-0 h-[1px] my-2" />
                  <div className="flex justify-between text-xl font-semibold py-2">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all
                             px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm w-24 sm:w-64 self-start"
                >
                  CHECKOUT
                </button>
              </div>

              {/* Promo Code Section */}
              <div className="flex-1 w-full text-lg font-semibold">
                <p className="text-gray-600">Have a promo code?</p>
                <div className="w-full lg:w-80 mt-2 flex">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="flex-1 h-10 sm:h-12 p-2 bg-gray-200 rounded-l-md text-sm sm:text-base"
                  />
                  <button className="h-10 sm:h-12 w-20 sm:w-32 bg-black text-white rounded-r-md hover:bg-gray-900 transition-all text-xs sm:text-sm">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
