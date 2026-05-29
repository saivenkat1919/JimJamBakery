import { useContext } from "react";

import Navbar from "../components/Navbar";

import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

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

            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;