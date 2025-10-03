import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      navigate('/'); // redirect to home/dashboard after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Create Your Account</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignup} className='space-y-6'>
          {/* Email */}
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

          {/* Password */}
          <div className='relative'>
            <label htmlFor="password" className='block mb-2 font-medium text-gray-600'>Password</label>
            <div className='flex items-center relative'>
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your Password'
                className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none'
                required
              />
              <button type='button' onClick={togglePassword} className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'>
                {showPassword ? <Eye className='w-5 h-5'/> : <EyeOff className='w-5 h-5'/>}
              </button>
            </div>
          </div>

          <button type='submit' className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'>Sign Up</button>
        </form>

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{" "}
            <Link to="/login" className='text-red-500 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
