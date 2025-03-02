import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsGraphUp, BsBoxSeam, BsCart4, BsPeopleFill } from 'react-icons/bs';
import { Link, Route, Routes } from 'react-router-dom';
import AdminProductsPage from './admin/adminProductsPage';
import AddProductForm from './admin/addProductForm';
import EditProductForm from './admin/editProductForm';
import AdminOrdersPage from './admin/adminOrderPage';

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + '/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.type !== 'admin') {
          toast.error('Unauthorized access');
          navigate('/login');
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch user data');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-purple-700 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <Link
          to="/admin/dashboard"
          className="flex items-center mb-4 p-2 hover:bg-purple-600 rounded-lg transition duration-300"
        >
          <BsGraphUp className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center mb-4 p-2 hover:bg-purple-600 rounded-lg transition duration-300"
        >
          <BsBoxSeam className="mr-2" /> Products
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center mb-4 p-2 hover:bg-purple-600 rounded-lg transition duration-300"
        >
          <BsCart4 className="mr-2" /> Orders
        </Link>
        <Link
          to="/admin/customers"
          className="flex items-center p-2 hover:bg-purple-600 rounded-lg transition duration-300"
        >
          <BsPeopleFill className="mr-2" /> Customers
        </Link>
      </div>
      <div className="flex-1 p-6">
        {user ? (
          <Routes path="/*">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/products/addProduct" element={<AddProductForm />} />
            <Route path="/products/editProduct" element={<EditProductForm />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/customers" element={<h1>Customers</h1>} />
            <Route path="/*" element={<h1>404 Not Found</h1>} />
          </Routes>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}