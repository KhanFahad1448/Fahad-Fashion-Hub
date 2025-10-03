import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Mens from './Pages/Mens';
import Womens from './Pages/Womens';
import Kids from './Pages/Kids';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import AllProducts from './Pages/AllProducts';
import SingleProduct from './components/SingleProduct';
import NewCollection from './components/NewCollection';
import Dashboard from './Pages/Dashboard';

import { auth } from './Firebase/firebase';

// Private Route wrapper
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const router = createBrowserRouter([
    { path: "/", element: <><Navbar user={user} handleLogout={handleLogout}/><Home/><Footer/></> },
    { path: "/mens", element: <><Navbar user={user} handleLogout={handleLogout}/><Mens/><Footer/></> },
    { path: "/womens", element: <><Navbar user={user} handleLogout={handleLogout}/><Womens/><Footer/></> },
    { path: "/kids", element: <><Navbar user={user} handleLogout={handleLogout}/><Kids/><Footer/></> },
    { path: "/login", element: <><Navbar user={user} handleLogout={handleLogout}/><Login/><Footer/></> },
    { path: "/signup", element: <><Navbar user={user} handleLogout={handleLogout}/><Signup/><Footer/></> },
    { path: "/cart", element: <PrivateRoute user={user}><><Navbar user={user} handleLogout={handleLogout}/><Cart/><Footer/></></PrivateRoute> },
    { path: "/products/:productId", element: <><Navbar user={user} handleLogout={handleLogout}/><SingleProduct/><Footer/></> },
    { path: "/new-collection", element: <><Navbar user={user} handleLogout={handleLogout}/><NewCollection/><Footer/></> },
    { path: "/products", element: <><Navbar user={user} handleLogout={handleLogout}/><AllProducts/><Footer/></> },
    { path: "/dashboard", element: <PrivateRoute user={user}><><Navbar user={user} handleLogout={handleLogout}/><Dashboard/><Footer/></></PrivateRoute> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
