import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ user, setUser, setUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  // Redirect immediately if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;

      // Update global App state
      setUser(loggedUser);

      // Fetch Firestore data for first name
      const userDoc = await getDoc(doc(db, 'users', loggedUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        sessionStorage.setItem('welcomeMsg', `Welcome, ${userDoc.data().firstName}!`);
      }

      // Show welcome message briefly before redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000); // 3 seconds welcome
    } catch (err) {
      setError('Invalid email or password.');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Login to Your Account</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {loading && <p className='text-green-500 text-center'>Logging you in...</p>}

        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-600'>Email Address</label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none'
              required
            />
          </div>

          <div className='relative'>
            <label htmlFor="password" className='block mb-2 font-medium text-gray-600'>Password</label>
            <div className='flex items-center relative'>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your Password'
                className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none'
                required
              />
              <button type='button' onClick={togglePassword} className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'>
                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an account? <Link to="/signup" className='text-red-500 hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
