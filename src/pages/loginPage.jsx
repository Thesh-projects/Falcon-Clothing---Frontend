import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + '/api/users/google', {
          token: res.access_token,
        })
        .then((res) => {
          if (res.data.message === 'User created') {
            toast.success('Your account is created. Now you can login via Google.');
          } else {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res.data.user.type === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          }
        });
    },
  });

  // Facebook Login (Placeholder)
  const facebookLogin = () => {
    toast('Facebook login is not implemented yet.', { icon: 'ℹ️' });
  };

  // Email/Password Login
  const login = () => {
    axios
      .post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user == null) {
          toast.error(res.data.message);
          return;
        }
        toast.success('Login success');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data.user.type === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Login failed');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-yellow-900 p-6">
          <h1 className="text-2xl font-bold text-center text-white">Welcome Back!</h1>
          <p className="text-sm text-center text-purple-100 mt-2">
            Login to access your account and explore amazing products.
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={login}
              className="w-full bg-yellow-900 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google Login Button */}
            <button
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <FcGoogle className="text-xl" />
              <span>Login with Google</span>
            </button>

            {/* Facebook Login Button */}
            <button
              onClick={facebookLogin}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaFacebook className="text-xl" />
              <span>Login with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-900 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}