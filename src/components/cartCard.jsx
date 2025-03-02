import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
  const productId = props.productId;
  const qty = props.qty;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data);
            setLoaded(true);
          } else {
            deleteItem(productId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      {!loaded ? (
        <tr>
          <td colSpan="6" className="text-center py-4">Loading...</td>
        </tr>
      ) : (
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="px-4 py-3">
            <img
              src={product?.images[0]}
              className="w-16 h-16 object-cover rounded-lg"
              alt="Product"
            />
          </td>
          <td className="px-4 py-3 text-gray-800">{product?.productName}</td>
          <td className="px-4 py-3 text-gray-600">{productId}</td>
          <td className="px-4 py-3 text-gray-600">{qty}</td>
          <td className="px-4 py-3 text-gray-600">LKR {product?.lastPrice.toFixed(2)}</td>
          <td className="px-4 py-3 text-gray-800 font-semibold">
            LKR {(product?.lastPrice * qty).toFixed(2)}
          </td>
        </tr>
      )}
    </>
  );
}