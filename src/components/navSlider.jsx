import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function NavSlider(props) {
  const closeSlider = props.closeSlider;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="bg-white w-64 h-full p-4">
        <div className="flex justify-between items-center mb-6">
          <img src="/logo.png" className="h-12 cursor-pointer" alt="Logo" />
          <IoMdClose onClick={closeSlider} className="text-3xl cursor-pointer text-purple-600" />
        </div>
        <div className="space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-purple-600 font-semibold">
            Home
          </Link>
          <Link to="/products" className="block text-gray-700 hover:text-purple-600 font-semibold">
            Products
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-purple-600 font-semibold">
            About Us
          </Link>
          <Link to="/contact" className="block text-gray-700 hover:text-purple-600 font-semibold">
            Contact Us
          </Link>
          <Link to="/cart" className="block text-gray-700 hover:text-purple-600 font-semibold">
            Cart
          </Link>
            <Link
                              to="/login"
                              className="flex items-center px-4 py-2 text-brown-600 hover:bg-brown-100 hover:text-brown-800 transition duration-300"
                            >
                              <HiUser className="text-xl mr-2" />
                              <span>Login</span>
                            </Link>
                            <Link
                              to="/signUp"
                              className="flex items-center px-4 py-2 text-brown-600 hover:bg-brown-100 hover:text-brown-800 transition duration-300"
                            >
                              <HiUser className="text-xl mr-2" />
                              <span>Sign Up</span>
                            </Link>
        </div>
      </div>
    </div>
  );
}