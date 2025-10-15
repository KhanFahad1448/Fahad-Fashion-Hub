import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../Context/ShopContext';
import { auth, db } from '../Firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const {
    cartItems,
    all_product,
    getTotalCartAmount,
    clearCart
  } = useContext(Shopcontext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    phone: '',
    email: '',
    paymentMethod: 'cod'
  });

  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrderClick = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setMessage('Please login to place an order.');
      return;
    }
    setShowPaymentModal(true);
  };

  const saveOrderToFirestore = async (method) => {
    const orderItems = all_product
      .filter(item => cartItems[item.id] > 0)
      .map(item => ({
        id: item.id,
        name: item.name,
        quantity: cartItems[item.id],
        price: item.new_price
      }));

    try {
      await addDoc(collection(db, 'orders'), {
        user: auth.currentUser.email,
        items: orderItems,
        totalAmount: getTotalCartAmount(),
        shippingDetails: formData,
        paymentMethod: method,
        createdAt: serverTimestamp()
      });

      clearCart();
      setMessage('Your order has been placed successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handlePaymentSelection = async (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    setShowPaymentModal(false);

    if (method === 'cod') {
      saveOrderToFirestore(method);
      return;
    }

    // Razorpay payment
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    setLoadingPayment(true);

    const options = {
      key: 'rzp_test_RTRCYoNs14NpBK', 
      amount: getTotalCartAmount() * 100, 
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Test Transaction',
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
        vpa: 'success@razorpay', // Test UPI
      },
      theme: {
        color: '#1560BD',
      },
      handler: function (response) {
        console.log('Payment Success:', response);
        saveOrderToFirestore(method);
      },
      modal: {
        ondismiss: function () {
          alert('Payment cancelled');
          setLoadingPayment(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 md:pt-32 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h2>
      {message && (
        <p className="text-green-500 font-semibold text-center mb-4">{message}</p>
      )}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
          <form className="space-y-4" onSubmit={handlePlaceOrderClick}>
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="123 Street, City"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Apartment, Suite, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-lg mt-4 transition-all duration-300 
                ${loadingPayment ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
              disabled={loadingPayment}
            >
              {loadingPayment ? 'Processing Payment...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
          <div className="space-y-4">
            {all_product
              .filter(item => cartItems[item.id] > 0)
              .map(item => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-gray-700 font-semibold">₹{item.new_price * cartItems[item.id]}</p>
                </div>
              ))
            }
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handlePaymentSelection('cod')}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => handlePaymentSelection('upi')}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                UPI
              </button>
              <button
                onClick={() => handlePaymentSelection('card')}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Credit/Debit Card
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
