import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-6 md:px-0'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          Login to Your Account
        </h2>
        <form action="" className='space-y-6'>
          {/* email input */}
          <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-600'>Email Address</label>
            <input 
            type="email" 
            id='email' 
            placeholder='Enter Your Email' 
            className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none' 
            required />
          </div>
          {/* password input */}
          <div className='relative'>
            <label htmlFor="password" className='block mb-2 font-medium text-gray-600'>
              Password
            </label>
            <div className='items-center flex relative'>
              <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Enter Your Password' 
              className='w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-red-300 focus:outline-none'
              required
              />
              <button type='button' onClick={togglePassword} className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'>
                {showPassword ? <Eye className='w-5 h-5'/> : <EyeOff className='w-5 h-5'/>}
              </button>
            </div>
          </div>
          {/* submit button */}
          <button type='submit' className='w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'>Login</button>

        </form>
        {/* additional link */}
        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an account?{" "}
            <a href="#" className='text-red-500 hover:underline'>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
