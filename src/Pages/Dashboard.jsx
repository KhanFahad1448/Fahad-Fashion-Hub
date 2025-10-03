import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login'); // Redirect if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) return null; // Prevent rendering before auth check

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
        <p className="text-gray-600 mb-6">This is your dashboard. Only logged-in users can access this page.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
