import Button from "@/Components/Button";
import { local_url } from "@/constant/constant";
import type { cart } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("session_code");
      const { data } = await axios.get(`${local_url}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        Loading your cart...
      </div>
    );

  if (!cart || cart.items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="empty cart"
          className="w-40 mb-4 opacity-70"
        />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add items to get started!</p>
      </div>
    );

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("session_code");
      const response = await axios.delete(`${local_url}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col text-gray-800 px-10 py-10">
      <h1 className="text-3xl font-semibold mb-6">🛒 Your Cart</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-gray-600">
            <th className="pb-3">Poster</th>
            <th className="pb-3">Name</th>
            <th className="pb-3">Quantity</th>
            <th className="pb-3">Price</th>
            <th className="pb-3 text-right">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cart.items.map((item) => (
            <tr
              key={item._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3">
                <img
                  src={item.productId.poster}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="py-3 font-medium">{item.productId.name}</td>
              <td className="py-3">{item.quantity}</td>
              <td className="py-3">₹{item.productId.price}</td>
              <td className="py-3 text-right font-semibold">
                ₹{item.quantity * item.productId.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-end">
        <div className="text-right">
          <p className="text-lg text-gray-600">Total:</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            ₹{cart.totalPrice}
          </h2>
        </div>
      </div>
      <div className="flex items-center mt-10 gap-10 px-10 justify-between">
        <Button onClick={clearCart} label="Clear Cart" />
        <Button onClick={() => navigate("/cart/checkout")} label="Check out" />
      </div>
    </div>
  );
};

export default CartPage;
