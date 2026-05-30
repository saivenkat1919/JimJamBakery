import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function StickyCartBar() {
  const { cartItems } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalItems =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const totalPrice =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  if (cartItems.length === 0)
    return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
      <div
        onClick={() =>
          navigate("/cart")
        }
        className="max-w-4xl mx-auto bg-orange-500 text-white rounded-2xl shadow-xl px-5 py-4 flex justify-between items-center cursor-pointer"
      >
        <div>
          <p className="font-bold">
            🛒 {totalItems} Items
          </p>

          <p className="text-sm opacity-90">
            ₹{totalPrice}
          </p>
        </div>

        <div className="font-bold text-lg">
          View Cart →
        </div>
      </div>
    </div>
  );
}

export default StickyCartBar;