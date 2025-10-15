import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Mens from './Pages/Mens';
import Womens from './Pages/Womens';
import Kids from './Pages/Kids';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import AllProducts from './Pages/AllProducts';
import SingleProduct from './components/Products/SingleProduct';
import NewCollection from './components/NewCollection';
import Dashboard from './Pages/Dashboard';
import { auth, db } from './Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Private Route wrapper
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Layout with Navbar + Outlet + Footer
const Layout = ({ user, userData, handleLogout }) => (
  <>
    <ScrollToTop />
    <Navbar user={user} userData={userData} handleLogout={handleLogout} />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Define Routes
  const router = createBrowserRouter([
    {
      element: <Layout user={user} userData={userData} handleLogout={handleLogout} />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/mens', element: <Mens /> },
        { path: '/womens', element: <Womens /> },
        { path: '/kids', element: <Kids /> },
        { path: '/login', element: <Login setUser={setUser} setUserData={setUserData} user={user} /> },
        { path: '/signup', element: <Signup setUser={setUser} setUserData={setUserData} user={user}/> },
        { path: '/cart', element: <PrivateRoute user={user}><Cart /></PrivateRoute> },
        { path: '/checkout', element: <PrivateRoute user={user}><Checkout /></PrivateRoute> },
        { path: '/products/:productId', element: <SingleProduct /> },
        { path: '/new-collection', element: <NewCollection /> },
        { path: '/products', element: <AllProducts /> },
        { path: '/dashboard', element: <PrivateRoute user={user}><Dashboard /></PrivateRoute> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
