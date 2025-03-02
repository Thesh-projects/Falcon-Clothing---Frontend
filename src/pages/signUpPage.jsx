import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        type: userType, // Send userType to backend
      });

      console.log('User created:', response.data);
      alert('User created successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-yellow-900 p-6">
          <h2 className="text-2xl font-bold text-center text-white">Create Your Account</h2>
          <p className="text-sm text-center text-purple-100 mt-2">
            Join us to explore amazing products and exclusive deals!
          </p>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Form fields for firstName, lastName, email, password, confirmPassword */}
            {/* ... */}

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-900 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Social login buttons and signup link */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}