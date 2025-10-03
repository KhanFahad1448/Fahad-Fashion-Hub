import React, { useContext, useState } from 'react';
import Logo from '../../assets/BuisnessLogo.png';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { Shopcontext } from '../../Context/ShopContext';
import { auth } from '../../Firebase/firebase';

const Navbar = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalCartItems } = useContext(Shopcontext);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className='bg-white px-4 fixed w-full z-50 shadow-sm top-0 shadow-gray-400'>
      <div className='max-w-7xl mx-auto py-2 px-5 flex justify-between items-center'>
        <Link to='/'> 
          <img src={Logo} alt="Logo" className='md:w-20 w-20' />
        </Link>

        <div className='flex items-center gap-5'>
          <nav className="hidden md:block">
            <ul className="flex items-center font-semibold text-xl gap-7">
              <li><Link to="/" className="hover:text-[#1560BD]">Home</Link></li>
              <li><Link to="/mens" className="hover:text-[#1560BD]">Mens</Link></li>
              <li><Link to="/womens" className="hover:text-[#1560BD]">Womens</Link></li>
              <li><Link to="/kids" className="hover:text-[#1560BD]">Kids</Link></li>
              
              {/* Dynamic Login / Logout */}
              <li>
                {user ? (
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="bg-red-500 text-white px-4 py-1 rounded-md">
                      Login
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          {/* Cart Icon */}
          <Link to='/cart' className='relative w-10'>
            <ShoppingCart/> 
            <div className='bg-red-500 w-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white'>
              {getTotalCartItems()}
            </div>
          </Link>

          {/* Mobile Hamburger */}
          {showMenu ? (
            <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
          ) : (
            <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden' size={30}/>
          )}
        </div>
      </div>

      {/* Responsive Menu */}
      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} user={user} handleLogout={handleLogout}/>
    </div>
  );
};

export default Navbar;
