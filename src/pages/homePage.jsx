import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header';
import LoginPage from './loginPage';
import ProductOverview from './home/productOverview';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';
import MyOrdersPage from './home/orders';
import Footer from '../components/footer';
import SignUpPage from './signUpPage';
import AdminHomePage from './adminHomePage';
import ProtectedRoute from '../components/protectedRoute';

function HomePage() {
  
  const handleShopNow = () => {
    navigate("/products");
  };

  const featuredProducts = [
    {
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
      name: "Classic Leather Jacket",
      price: 299.99,
      description: "A timeless leather jacket for a rugged yet refined look.",
    },
    {
      image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660",
      name: "Premium Cotton Shirt",
      price: 89.99,
      description: "Soft and breathable cotton shirt for everyday comfort.",
    },
    {
      image: "https://images.unsplash.com/photo-1584382296853-21f1b3e9c268",
      name: "Tailored Suit",
      price: 599.99,
      description: "A perfectly tailored suit for formal occasions.",
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      name: "Casual Denim",
      price: 129.99,
      description: "Stylish and durable denim for a casual look.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
     
      <Header />

      
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891"
          alt="Premium Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Timeless Elegance</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our new collection of refined menswear, crafted with precision and passion.
          </p>
          <button
            onClick={handleShopNow}
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md hover:bg-yellow-500 transition-colors font-medium"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-center text-gray-900 mb-12">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              handleShopNow={handleShopNow}
            />
          ))}
        </div>
      </div>

    
      <div className="flex-grow">
        <Router>
        <Routes>
          <Route path="/" element={<h1></h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminHomePage/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/productInfo/:id" element={<ProductOverview />} />
          <Route path="/signUp" element ={<SignUpPage/>}/>

          <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminHomepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute role="user">
              <ProductPage />
            </ProtectedRoute>
          }
        />

        </Routes>
        </Router>
      </div>

     
      <Footer />
    </div>
  );
}

const ProductCard = ({ product, handleShopNow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      
        <button
          onClick={handleShopNow}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md hover:bg-gray-100"
        >
          Shop Now
        </button>
      </div>

     
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>

  
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center p-4 rounded-lg">
          <div className="text-white text-center">
            <h3 className="text-xl font-medium mb-2">{product.name}</h3>
            <p className="text-sm mb-4">{product.description}</p>
            <button
              onClick={handleShopNow}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Add Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;