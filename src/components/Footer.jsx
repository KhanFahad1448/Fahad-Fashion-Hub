import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/BuisnessLogo.png';
import { FaFacebook, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
import { db } from "../Firebase/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('⚠️ Please enter your email before subscribing.', {
        style: { background: '#333', color: '#fff' },
      });
      return;
    }

    try {
      // 1️⃣ Save email in Firestore
      await addDoc(collection(db, 'newsletterSubscriptions'), {
        email,
        timestamp: serverTimestamp(),
      });

      // 2️⃣ Send email to your inbox using EmailJS
      await emailjs.send(
        'service_e55ionr',      // Replace with your EmailJS service ID
        'template_86cycrq',     // Replace with your EmailJS template ID
        {
          user_email: email,
          to_name: 'Fahad Fashion Hub',
        },
        'Crynuigzc393gC8yQ'     // Replace with your EmailJS public key
      );

      toast.success('🎉 Thank you for subscribing! You’ll receive updates soon.', {
        style: { background: '#111827', color: '#fff' },
        iconTheme: { primary: '#ef4444', secondary: '#fff' },
      });
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('❌ Something went wrong. Please try again.', {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  return (
    <footer className='bg-gray-900 text-gray-200 py-10 relative'>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/* info */}
        <div className='mb-6 md:mb-0'>
          <Link to='/'>
            <img src={Logo} alt='Fahad Fashion Hub' className='w-32' />
          </Link>
          <p className='mt-2 text-sm text-white'>
            High-quality, sustainable clothing at affordable prices.
          </p>
          <p className='mt-2 text-sm text-white'>
            Hill View Road, Near Rahat Nursing Home, Bariatu Ranchi 09
          </p>
          <p className='text-sm text-white'>Email: support@FahadFashionHub.com</p>
          <p className='text-sm text-white'>Phone: +91-8085509001</p>
        </div>

        {/* customer service link */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Customer Service</h3>
          <ul className='mt-2 text-sm space-y-2'>
            <li className='hover:text-red-500 transition duration-200 cursor-pointer'>Contact Us</li>
            <li className='hover:text-red-500 transition duration-200 cursor-pointer'>Shipping & Returns</li>
            <li className='hover:text-red-500 transition duration-200 cursor-pointer'>FAQs</li>
            <li className='hover:text-red-500 transition duration-200 cursor-pointer'>Order Tracking</li>
            <li className='hover:text-red-500 transition duration-200 cursor-pointer'>Size Guide</li>
          </ul>
        </div>

        {/* social media links */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold '>Follow Us</h3>
          <div className='flex space-x-4 mt-2 text-2xl'>
            <FaFacebook className='hover:text-blue-500 transition-colors duration-200 cursor-pointer' />
            <FaInstagram className='hover:text-pink-500 transition-colors duration-200 cursor-pointer' />
            <FaTwitterSquare className='hover:text-sky-400 transition-colors duration-200 cursor-pointer' />
          </div>
        </div>

        {/* newsletter subscription */}
        <div>
          <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
          <p className='mt-2 text-sm text-white'>
            Subscribe to get special offers, free giveaways, and more
          </p>

          {/* Firebase + EmailJS form setup */}
          <form onSubmit={handleSubmit} className='mt-4 flex'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your email address'
              className='w-full p-2 rounded-l-md bg-gray-800 text-gray-200 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
            <button
              type='submit'
              className='bg-red-600 text-white px-4 rounded-r-md 
              hover:bg-red-700 focus:ring-2 focus:ring-red-500 
              transition-colors duration-200'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm text-white'>
        <p className='text-white'>
          &copy; {new Date().getFullYear()}
          <span className='text-red-500'> Fahad's Fashion Hub. </span>
          All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
