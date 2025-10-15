import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import MultiBanner from '../components/MultiBanner';
import NewCollection from '../components/NewCollection';
import MidBanner from '../components/MidBanner';
import TopSellers from '../components/TopSellers';
import Features from '../components/Features';

const Home = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Get welcome message from sessionStorage
    const msg = sessionStorage.getItem('welcomeMsg');
    if (msg) {
      setWelcomeMessage(msg);

      // Remove the message after 5 seconds
      const timer = setTimeout(() => {
        setWelcomeMessage('');
        sessionStorage.removeItem('welcomeMsg');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Welcome message banner */}
      {welcomeMessage && (
        <div className="bg-green-100 text-green-800 px-6 py-3 text-center font-medium shadow-md">
          {welcomeMessage}
        </div>
      )}

      <HeroBanner />
      <MultiBanner />
      <NewCollection />
      <MidBanner />
      <TopSellers />
      <Features />
    </>
  );
};

export default Home;
