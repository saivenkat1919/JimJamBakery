import { useContext, useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Navbar from "../components/Navbar";

import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
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
        customerName: user.username,
        items: cartItems,
        total,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully");

      clearCart();
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between"
              >
                <div>
                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-500 text-white px-4 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-2xl font-bold">
              Total: ₹{total}
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              {loading
                ? "Placing..."
                : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;