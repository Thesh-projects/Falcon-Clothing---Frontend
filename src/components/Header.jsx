import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import NavSlider from './navSlider';
import {
  HiHome,
  HiShoppingBag,
  HiInformationCircle,
  HiMail,
  HiShoppingCart,
  HiUser,
} from 'react-icons/hi';

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-20 px-4">
          
          <Link to="/">
            <img src="/logo.png" className="h-16 cursor-pointer" alt="Logo" />
          </Link>

       
          <RxHamburgerMenu
            onClick={() => setIsSliderOpen(true)}
            className="text-3xl cursor-pointer text-brown-600 lg:hidden"
          />

       
          <div className="hidden lg:flex space-x-8 items-center">
          
            <Link to="/" className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300">
              <HiHome className="text-2xl" />
              <span className="ml-2 font-semibold">Home</span>
            </Link>

          
            <Link to="/products" className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300">
              <HiShoppingBag className="text-2xl" />
              <span className="ml-2 font-semibold">Products</span>
            </Link>

            
            <Link to="/about" className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300">
              <HiInformationCircle className="text-2xl" />
              <span className="ml-2 font-semibold">About Us</span>
            </Link>

           
            <Link to="/contact" className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300">
              <HiMail className="text-2xl" />
              <span className="ml-2 font-semibold">Contact Us</span>
            </Link>

           
            <Link to="/cart" className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300">
              <HiShoppingCart className="text-2xl" />
              <span className="ml-2 font-semibold">Cart</span>
            </Link>

            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:bg-brown-700 transition duration-300"
              >
                <HiUser className="text-2xl" />
              </button>

            
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-amber-600 rounded-lg shadow-lg">
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
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}