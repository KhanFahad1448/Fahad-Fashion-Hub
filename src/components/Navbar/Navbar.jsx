import React, { useContext, useState, useEffect } from 'react';
import Logo from '../../assets/BuisnessLogo.png';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { Shopcontext } from '../../Context/ShopContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

const Navbar = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [firstName, setFirstName] = useState('');
  const { getTotalCartItems } = useContext(Shopcontext);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) setFirstName(userDoc.data().firstName || '');
        } catch {
          setFirstName('');
        }
      } else setFirstName('');
    };
    fetchUserName();
  }, [user]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white backdrop-blur-md shadow-lg py-2' : 'bg-white shadow-md py-3'}`}>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8'>
        <div className='flex items-center'>
          <Link to='/'><img src={Logo} alt="Logo" className={`object-contain transition-all duration-300 ${scrolled ? 'w-20 md:w-24' : 'w-24 md:w-28'}`} /></Link>
        </div>

        <nav className="hidden md:flex items-center gap-10 font-semibold text-gray-700 text-lg md:text-xl">
          <Link to="/" className="hover:text-[#1560BD] transition-colors">Home</Link>
          <Link to="/mens" className="hover:text-[#1560BD] transition-colors">Mens</Link>
          <Link to="/womens" className="hover:text-[#1560BD] transition-colors">Womens</Link>
          <Link to="/kids" className="hover:text-[#1560BD] transition-colors">Kids</Link>
        </nav>

        <div className='flex items-center gap-4 md:gap-6'>
          <Link to='/cart' className='relative flex items-center gap-1 text-gray-700 hover:text-[#1560BD] transition-colors'>
            <ShoppingCart size={24} />
            <span className='text-sm md:text-base font-medium'>Cart</span>
            {getTotalCartItems() > 0 && (
              <div className='bg-red-500 w-5 h-5 absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white text-xs'>{getTotalCartItems()}</div>
            )}
          </Link>

          {user ? (
            <div className='flex items-center gap-2'>
              {firstName && <span className='text-gray-700 font-medium text-sm md:text-base'>Hello, {firstName}</span>}
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors text-sm md:text-base">Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors text-sm md:text-base">Login</button>
            </Link>
          )}

          <div className='md:hidden'>
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} size={28} className='cursor-pointer text-gray-700 hover:text-[#1560BD] transition-colors'/>
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} size={28} className='cursor-pointer text-gray-700 hover:text-[#1560BD] transition-colors'/>
            )}
          </div>
        </div>
      </div>

      <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} user={user} handleLogout={handleLogout} />
    </header>
  );
};

export default Navbar;
