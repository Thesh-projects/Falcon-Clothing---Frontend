import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#6B4637] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform dedicated to providing high-quality products and exceptional customer service.
            </p>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-[#FFD700]">Home</a></li>
              <li><a href="/products" className="text-sm hover:text-[#FFD700]">Products</a></li>
              <li><a href="/cart" className="text-sm hover:text-[#FFD700]">Cart</a></li>
              <li><a href="/orders" className="text-sm hover:text-[#FFD700]">My Orders</a></li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul> <li> <span className="text-sm">123 Main Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:info@example.com" className="text-sm hover:text-[#FFD700]">info@example.com</a>
              </li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-[#8B6B5D] mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;