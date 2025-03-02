import { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-20 px-4">
          {/* Logo */}
          <Link to="/">
            <img
              src="/logo.png" // Ensure the logo is in the public folder
              className="h-16 cursor-pointer"
              alt="Logo"
            />
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <RxHamburgerMenu
            onClick={() => setIsSliderOpen(true)}
            className="text-3xl cursor-pointer text-brown-600 lg:hidden"
            aria-label="Open navigation menu"
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8 items-center">
            {/* Home */}
            <Link
              to="/"
              className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300"
              aria-label="Home"
            >
              <HiHome className="text-2xl" />
              <span className="ml-2 font-semibold">Home</span>
            </Link>

            {/* Products */}
            <Link
              to="/products"
              className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300"
              aria-label="Products"
            >
              <HiShoppingBag className="text-2xl" />
              <span className="ml-2 font-semibold">Products</span>
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300"
              aria-label="About Us"
            >
              <HiInformationCircle className="text-2xl" />
              <span className="ml-2 font-semibold">About Us</span>
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300"
              aria-label="Contact Us"
            >
              <HiMail className="text-2xl" />
              <span className="ml-2 font-semibold">Contact Us</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center text-brown-600 hover:text-brown-800 transition duration-300"
              aria-label="Cart"
            >
              <HiShoppingCart className="text-2xl" />
              <span className="ml-2 font-semibold">Cart</span>
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:bg-brown-700 transition duration-300"
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
              >
                <HiUser className="text-2xl" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-amber-600 rounded-lg shadow-lg">
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-brown-600 hover:bg-brown-100 hover:text-brown-800 transition duration-300"
                    aria-label="Login"
                  >
                    <HiUser className="text-xl mr-2" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signUp"
                    className="flex items-center px-4 py-2 text-brown-600 hover:bg-brown-100 hover:text-brown-800 transition duration-300"
                    aria-label="Sign Up"
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