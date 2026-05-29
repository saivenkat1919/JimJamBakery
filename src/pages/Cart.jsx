import { useContext, useState } from "react";
import toast from "react-hot-toast";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

import { db } from "../firebase/config";

import Navbar from "../components/Navbar";

import { CartContext } from "../context/CartContext";

function Cart() {
  const {
  cartItems,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await addDoc(collection(db, "orders"), {
  customerName: user.name || user.email,
  customerEmail: user.email,
  customerId: user.uid,
  items: cartItems,
  total,
  status: "Pending",
  createdAt: serverTimestamp(),
});

      toast.success("Order placed successfully");

      clearCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
  <h2 className="text-3xl font-bold text-gray-500 mb-4">
    Your cart is empty
  </h2>

  <p className="text-gray-400">
    Add delicious bakery items to continue
  </p>
</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
  key={item.id}
  className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-4 md:items-center"
>
  <div>
    <h2 className="text-xl font-bold">
      {item.name}
    </h2>

    <p className="text-gray-500">
      ₹{item.price} each
    </p>

    <p className="text-orange-500 font-bold mt-2">
      ₹
      {item.price *
        item.quantity}
    </p>
  </div>

  <div className="flex items-center gap-3">
    {/* DECREASE */}

    <button
      onClick={() =>
        decreaseQuantity(item.id)
      }
      className="bg-gray-200 p-2 rounded-lg"
    >
      <FiMinus />
    </button>

    {/* QUANTITY */}

    <span className="text-xl font-bold w-8 text-center">
      {item.quantity}
    </span>

    {/* INCREASE */}

    <button
      onClick={() =>
        increaseQuantity(item.id)
      }
      className="bg-orange-500 text-white p-2 rounded-lg"
    >
      <FiPlus />
    </button>

    {/* REMOVE */}

    <button
      onClick={() =>
        removeFromCart(item.id)
      }
      className="bg-red-500 text-white p-2 rounded-lg ml-2"
    >
      <FiTrash2 />
    </button>
  </div>
</div>
            ))}

            <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row justify-between items-center gap-4">
  <div>
    <h2 className="text-gray-500">
      Total Amount
    </h2>

    <p className="text-3xl font-bold text-orange-500">
      ₹{total}
    </p>
  </div>

  <button
    onClick={placeOrder}
    disabled={loading}
    className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-3 rounded-xl font-semibold"
  >
    {loading
      ? "Placing..."
      : "Place Order"}
  </button>
</div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;