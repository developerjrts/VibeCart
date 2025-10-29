import { useState, useEffect } from "react";
import axios from "axios";
import { local_url } from "@/constant/constant";
import type { cart } from "@/types/types";
import TextField from "@/Components/TextField";

const Checkout = () => {
  const [cart, setCart] = useState<cart | null>(null);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("session_code");
      const response = await axios.get(`${local_url}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    if (!name || !email) return alert("Please fill in all fields.");
    if (!cart || cart.items.length === 0) return alert("Cart is empty.");

    try {
      setLoading(true);
      const token = localStorage.getItem("session_code");
      const response = await axios.post(
        `${local_url}/cart/checkout`,
        { cartItems: cart.items, name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceipt(response.data);
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="flex flex-col items-center px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <TextField
          type="text"
          value={name}
          setValue={setName}
          placeholder="Enter your name"
          label="Name"
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="you@example.com"
        />

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-medium">Total:</span>
          <span className="text-xl font-semibold">
            ₹{cart?.totalPrice || 0}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>

      {receipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-2xl font-semibold mb-4">Order Confirmed 🎉</h2>
            <p className="text-gray-700 mb-2">
              <strong>Receipt ID:</strong> {receipt.receiptId || "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Total:</strong> ₹{receipt.total || cart?.totalPrice}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Date:</strong>{" "}
              {new Date(receipt.timestamp || Date.now()).toLocaleString()}
            </p>
            <button
              onClick={() => setReceipt(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
