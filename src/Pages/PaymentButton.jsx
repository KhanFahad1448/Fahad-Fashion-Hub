import React from 'react';

const PaymentButton = ({ amount, name, email, contact }) => {

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_RTRCYoNs14NpBK', // Replace with your Razorpay test key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Test Transaction',
      prefill: {
        name: name,
        email: email,
        contact: contact,
        vpa: 'success@razorpay', // UPI test ID
      },
      theme: {
        color: '#1560BD',
      },
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      modal: {
        ondismiss: function () {
          alert('Payment cancelled');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
