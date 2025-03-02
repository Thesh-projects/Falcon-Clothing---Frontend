import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = loadCart();
    setCart(cartItems);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cartItems,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.total);
        }
      });
  }, []);

  function onOrderCheckOutClick() {
    navigate("/shipping", {
      state: {
        items: loadCart(),
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

    
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          
            {cart.map((item) => (
              <CartCard
                key={item.productId}
                productId={item.productId}
                qty={item.qty}
              />
            ))}
      
        </table>
      </div>

    
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-800 font-semibold">LKR {labeledTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span className="text-red-600 font-semibold">- LKR {(labeledTotal - total).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-800 font-bold">Grand Total:</span>
            <span className="text-gray-800 font-bold">LKR {total.toFixed(2)}</span>
          </div>
        </div>

        
        <button
          onClick={onOrderCheckOutClick}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}