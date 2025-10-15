import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info in Firestore (UID as doc ID)
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      // Show success message and redirect to Login
      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);

    } catch (err) {
      console.error('Signup Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please log in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0 pt-28 md:pt-32'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Create Your Account</h2>
        {error && <p className='text-red-500 text-center text-sm'>{error}</p>}
        {successMsg && <p className='text-green-600 text-center text-sm'>{successMsg}</p>}

        <form onSubmit={handleSignup} className='space-y-6'>
          {/* First Name */}
          <div>
            <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-600'>
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Enter First Name'
              className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none'
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor='lastName' className='block mb-2 text-sm font-medium text-gray-600'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Enter Last Name'
              className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-600'>
              Email
            </label>
            <input
              type='email'
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
            <label htmlFor='password' className='block mb-2 font-medium text-gray-600'>
              Password
            </label>
            <div className='flex items-center relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your Password'
                className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none'
                required
              />
              <button
                type='button'
                onClick={togglePassword}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
              >
                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
          >
            Sign Up
          </button>
        </form>

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-500 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
